from bcrypt import gensalt, hashpw, checkpw
from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_login.exceptions import InvalidCredentialsException
from fastapi_mail import FastMail, ConnectionConfig, MessageSchema, MessageType
from pyotp import random_base32, HOTP
from redis import Redis

from backend.config import EMAIl, PASSWORD, SERVER, REDIS_KEY, REDIS_HOST, REDIS_PORT
from backend.crud import manager, query_user, add_user
from backend.schemas import UserRegistrationRequest, VerifyUserOTP

conf = ConnectionConfig(
    MAIL_USERNAME=EMAIl,
    MAIL_PASSWORD=PASSWORD,
    MAIL_FROM=EMAIl,
    MAIL_PORT=465,
    MAIL_SERVER=SERVER,
    MAIL_STARTTLS=False,
    MAIL_SSL_TLS=True,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

router = APIRouter(prefix="/auth")
email_server = FastMail(conf)
redis_host = REDIS_HOST
redis_port = REDIS_PORT
redis_password = REDIS_KEY


@router.post("/login")
async def login(login_form: OAuth2PasswordRequestForm = Depends()):
    username = login_form.username
    password = login_form.password
    user = query_user(user=username)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    elif checkpw(password.encode(), user.password.encode()):
        access_token = manager.create_access_token(data={"sub": username})
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"access_token": access_token, "token_type": "bearer"}
        )
    else:
        raise InvalidCredentialsException


@router.post("/register")
async def register(user: UserRegistrationRequest):
    global secret
    username = user.username
    email = user.email
    password = user.password
    user = query_user(user=username)
    if user is not None:
        return JSONResponse(
            status_code=status.HTTP_409_CONFLICT,
            content="User already is already registered, please login"
        )
    else:
        redis_cache = Redis(host=redis_host, port=redis_port, password=redis_password, ssl=True)
        counter = redis_cache.lindex(email, -1)
        secret = redis_cache.lindex(email, 2)
        if counter is not None:
            counter = int(counter.decode()) + 1
            redis_cache.lset(email, -1, str(counter))
        else:
            counter = 0
            secret = random_base32()
            redis_cache.rpush(email, username, password, str(secret), str(counter))
            redis_cache.expire(email, 300)
        html = """
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Registration OTP</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #ffffff; /* white */
              color: #333333; /* dark grey */
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              border: 2px solid #ffa500; /* orange */
              border-radius: 10px;
            }
            .logo {
              text-align: center;
              margin-bottom: 20px;
            }
            .logo img {
              width: 150px;
            }
            .otp-section {
              background-color: #008000; /* green */
              color: #ffffff; /* white */
              padding: 10px;
              text-align: center;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Verify OTP</h2>
            <p>Hello,</p>
            <p>Thank you for registering on our website. Please use the following One Time Password (OTP) to complete your registration:</p>
            <div class="otp-section">
              <h3>Your OTP:</h3>
              <p style="font-size: 24px;">%s</p> <!-- Example OTP, replace with actual OTP -->
            </div>
            <p>If you did not register on our website, please ignore this email.</p>
            <p>Best regards,<br>Team HealthCast</p>
          </div>
        </body>
        </html>
        """ % (HOTP(secret).at(counter))
        message = MessageSchema(
            subject="Verify HealthCast Account",
            recipients=[email],
            body=html,
            subtype=MessageType.html
        )
        try:
            await email_server.send_message(message)
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content="Verification email sent"
            )
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=str(e)
            )
        finally:
            redis_cache.connection_pool.close()


@router.post("/verify")
async def data(body: VerifyUserOTP):
    email = body.email
    otp = body.otp
    redis_cache = Redis(host=redis_host, port=redis_port, password=redis_password, ssl=True)
    username = redis_cache.lindex(email, 0)
    password = redis_cache.lindex(email, 1)
    secret = redis_cache.lindex(email, 2)
    counter = redis_cache.lindex(email, 3)
    if counter is None:
        raise HTTPException(
            status_code=200,
            detail="Invalid or expired OTP"
        )
    else:
        hotp = HOTP(secret.decode())
        if hotp.verify(otp, int(counter.decode())):
            add_user(
                email,
                username.decode(),
                hashpw(password, gensalt()).decode()
            )
            redis_cache.delete(email)
            redis_cache.connection_pool.close()
            access_token = manager.create_access_token(data={"sub": username.decode()})
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={"access_token": access_token, "token_type": "bearer"}
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect OTP"
            )

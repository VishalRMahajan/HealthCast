from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.responses import JSONResponse, RedirectResponse
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_login.exceptions import InvalidCredentialsException
from fastapi_mail import FastMail, ConnectionConfig, MessageSchema, MessageType
from pyotp import random_base32, HOTP
from redis import Redis

from backend.config import EMAIl, PASSWORD, SERVER, REDIS_KEY, REDIS_HOST, REDIS_PORT
from backend.crud import manager, query_user
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
secret = None
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
    elif password != user.password:
        raise InvalidCredentialsException
    else:
        access_token = manager.create_access_token(data={"sub": username})
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"access_token": access_token, "token_type": "bearer"}
        )


@router.post("/register")
async def register(user: UserRegistrationRequest):
    global secret
    username = user.username
    email = user.email
    password = user.password
    user = query_user(user=username)
    if user is not None:
        return RedirectResponse(url="/auth/login")
    else:
        redis_client = Redis(host=redis_host, port=redis_port, password=redis_password, ssl=True)
        counter = redis_client.lindex(email, -1)
        secret = redis_client.lindex(email, 2)
        if counter is not None:
            counter = int(counter.decode()) + 1
            redis_client.lset(email, -1, str(counter))
        else:
            counter = 0
            secret = random_base32()
            redis_client.rpush(email, username, password, str(secret), str(counter))
            redis_client.expire(email, 300)
        html = f"""
        <p>OTP: {HOTP(secret).at(counter)}</p>
        """
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
            redis_client.connection_pool.close()


@router.post("/verify")
async def data(body: VerifyUserOTP):
    email = body.email
    otp = body.otp
    redis_client = Redis(host=redis_host, port=redis_port, password=redis_password, ssl=True)
    username = redis_client.lindex(email, 0)
    password = redis_client.lindex(email, 1)
    secret = redis_client.lindex(email, 2)
    counter = redis_client.lindex(email, 3)
    if counter is None:
        raise HTTPException(
            status_code=200,
            detail="Invalid or expired OTP"
        )
    else:
        hotp = HOTP(secret.decode())
        if hotp.verify(otp, int(counter.decode())):
            print(f"Username: {username.decode()}\nPassword: {password.decode()}")
            redis_client.delete(email)
            redis_client.connection_pool.close()
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content="User verified"
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect OTP"
            )

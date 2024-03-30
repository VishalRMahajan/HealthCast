from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.responses import JSONResponse, RedirectResponse
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_login.exceptions import InvalidCredentialsException
from fastapi_mail import FastMail, ConnectionConfig, MessageSchema, MessageType

from backend.config import EMAIl, PASSWORD, SERVER
from backend.crud import manager, query_user
from backend.schemas import UserRegistrationRequest

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

html = """
<p>Thanks for using Fastapi-mail</p> 
"""


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
    username = user.username
    email = user.email
    password = user.password
    user = query_user(user=username)
    print("Doing something")
    if user is not None:
        return RedirectResponse(url="/auth/login")
    else:
        message = MessageSchema(
            subject="Verify HealthCast Account",
            recipients=[email],
            body=html,
            subtype=MessageType.html
        )
        await email_server.send_message(message)
        print("Verification email sent to " + email)
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content="Verification email sent"
        )


@router.get("/verify")
async def data(user=Depends(manager)):
    return JSONResponse(
        status_code=200,
        content="You are logged in as " + user.username
    )

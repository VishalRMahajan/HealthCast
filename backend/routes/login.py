from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_login import LoginManager
from fastapi_login.exceptions import InvalidCredentialsException
from pydantic import BaseModel
from sqlalchemy.exc import NoResultFound

from backend.config import SECRET
from backend.models.database import database
from backend.models.users import Users

router = APIRouter(prefix="/auth")
manager = LoginManager(SECRET, "/auth/login")


class UserLoginRequest(BaseModel):
    """Request model for the login endpoint"""
    email: str
    password: str


@manager.user_loader()
def query_user(email_id):
    try:
        return database.query(Users).filter_by(email=email_id).one()
    except NoResultFound:
        return None


@router.post("/login")
async def login(login_form: OAuth2PasswordRequestForm = Depends()):
    username = login_form.username
    password = login_form.password
    user = query_user(username)
    if not user:
        print(f"User: {username} not found")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    elif password != user.password:
        print(f"User: {username} Password does not match")
        raise InvalidCredentialsException
    else:
        access_token = manager.create_access_token(data={"sub": username})
        print(f"User: {username} has logged in!")
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"access_token": access_token, "token_type": "bearer"}
        )


@router.get("/verify")
async def data(user=Depends(manager)):
    return JSONResponse(
        status_code=200,
        content="You are logged in as " + user.email
    )

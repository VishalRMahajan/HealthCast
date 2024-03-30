from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_login.exceptions import InvalidCredentialsException

from backend.crud import manager, query_user

# from backend.schemas import UserLoginRequest

router = APIRouter(prefix="/auth")


@router.post("/login")
async def login(login_form: OAuth2PasswordRequestForm = Depends()):
    username = login_form.username
    password = login_form.password
    user = query_user(user=username)
    if not user:
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


@router.get("/verify")
async def data(user=Depends(manager)):
    return JSONResponse(
        status_code=200,
        content="You are logged in as " + user.username
    )

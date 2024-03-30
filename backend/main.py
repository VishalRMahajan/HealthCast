from fastapi import FastAPI

from backend.routes.diabetics import router as diabetics_router
from backend.routes.login import router as login_router

app = FastAPI()


@app.get("/")
async def root():
    return "Connected to the server!"


app.include_router(router=login_router)
app.include_router(router=diabetics_router)

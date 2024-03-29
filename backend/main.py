from fastapi import FastAPI
from backend.routes.diabetics import router as diabetics_router

app = FastAPI()


@app.get("/")
async def root():
    return "Connected to the server!"

app.include_router(router=diabetics_router)

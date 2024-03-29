from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return "Connected to the server!"

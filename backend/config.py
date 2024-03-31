import os

from dotenv import load_dotenv

load_dotenv()

# DB_URL = postgresql://username:password@hostname:port/database
DB_URL = os.getenv("DB_URL")
SECRET = os.getenv("SECRET").encode()  # Required by Login Manager
EMAIl = os.getenv("EMAIL")
PASSWORD = os.getenv("PASSWORD")
SERVER = os.getenv("SERVER")
REDIS_HOST = os.getenv("REDIS_HOST")
REDIS_PORT = os.getenv("REDIS_PORT")
REDIS_KEY = os.getenv("REDIS_KEY")

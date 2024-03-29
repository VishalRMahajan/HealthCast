import os
from dotenv import load_dotenv

load_dotenv()

# DB_URL = postgresql://username:password@hostname:port/database
DB_URL = os.getenv("DB_URL")
SECRET = os.getenv("SECRET").encode()  # Required by Login Manager

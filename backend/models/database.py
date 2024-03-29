from config import DB_URL

from sqlalchemy.orm import declarative_base, Session
from sqlalchemy import create_engine

Base = declarative_base()
engine = create_engine(DB_URL)
database = Session(bind=engine)

Base.metadata.create_all(engine, checkfirst=True)

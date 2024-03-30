from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from backend.config import DB_URL

engine = create_engine(DB_URL)
# database = Session(bind=engine)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        return db
    finally:
        db.close()


database = get_db()

Base.metadata.create_all(bind=engine, checkfirst=True)

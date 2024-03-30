from sqlalchemy import Column, String

from backend.models.database import Base, get_db


class Users(Base):
    __tablename__ = "users"

    name = Column(String, nullable=False)
    email = Column(String, primary_key=True)
    password = Column(String, nullable=False)


database = get_db()

Base.metadata.create_all(database.get_bind(), checkfirst=True)

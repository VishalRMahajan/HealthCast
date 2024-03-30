from sqlalchemy import Column, String

from backend.database import Base


class Users(Base):
    __tablename__ = "Users"

    username = Column("Username", String, nullable=False)
    email = Column("Email", String, primary_key=True)
    password = Column("Password", String, nullable=False)

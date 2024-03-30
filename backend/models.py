from sqlalchemy import Column, String, DateTime, Integer, Float, ForeignKey

from backend.database import Base, engine


class Users(Base):
    __tablename__ = "Users"

    username = Column("Username", String, primary_key=True, nullable=False)
    email = Column("Email", String, unique=True, nullable=False)
    password = Column("Password", String, nullable=False)


class Diabetes(Base):
    __tablename__ = "Diabetes"

    id = Column("ID", String, primary_key=True)
    username = Column("User", String, ForeignKey(Users.username), nullable=False)
    datetime = Column("DateTime", DateTime, nullable=False)
    pregnancies = Column("Pregnancies", Integer, nullable=False)
    glucose = Column("Glucose", Integer, nullable=False)
    blood_pressure = Column("BloodPressure", Integer, nullable=False)
    insulin = Column("Insulin", Integer, nullable=False)
    bmi = Column("BMI", Float, nullable=False)
    diabetes_pedigree_function = Column("DiabetesPedigreeFunction", Float, nullable=False)
    age = Column("Age", Integer, nullable=False)

    def __repr__(self):
        return {
            "pregnancies": self.pregnancies,
            "glucose": self.glucose,
            "blood_pressure": self.blood_pressure,
            "insulin": self.insulin,
            "bmi": self.bmi,
            "diabetes_pedigree_function": self.diabetes_pedigree_function,
            "age": self.age
        }


Base.metadata.create_all(bind=engine, checkfirst=True)

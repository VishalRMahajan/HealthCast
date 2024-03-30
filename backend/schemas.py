from pydantic import BaseModel


class UserLoginRequest(BaseModel):
    email: str
    password: str


class Diabetics(BaseModel):
    pregnancies: int
    glucose: int
    blood_pressure: int
    insulin: int
    bmi: float
    diabetes_pedigree_function: float
    age: int

from pydantic import BaseModel, EmailStr


class UserRegistrationRequest(BaseModel):
    username: str
    email: EmailStr
    password: str


class VerifyUserOTP(BaseModel):
    email: EmailStr
    otp: str


class Diabetics(BaseModel):
    pregnancies: int
    glucose: int
    blood_pressure: int
    insulin: int
    bmi: float
    diabetes_pedigree_function: float
    age: int

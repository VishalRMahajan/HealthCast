import json
import pickle
from datetime import datetime, timedelta
from secrets import token_hex

from fastapi_login import LoginManager
from numpy import array
from sqlalchemy.exc import NoResultFound

from backend.config import SECRET
from backend.database import database
from backend.models import Users, Diabetes
from backend.schemas import Diabetics

manager = LoginManager(SECRET, token_url="/auth/login")

ModelLocation = "Machine Learning/ML Models/Diabetics_logistic_model.sav"
ScalarLocation = "Machine Learning/ML Models/DiabeticsScaler.sav"

diabetics_mlmodel = pickle.load(open(ModelLocation, "rb"))
diabetics_scaler = pickle.load(open(ScalarLocation, "rb"))


@manager.user_loader()
def query_user(user: str):
    try:
        return database.query(Users).filter_by(username=user).one()
    except NoResultFound:
        return None


def add_diabetics(user: Users, data: Diabetics):
    now = datetime.utcnow() + timedelta(hours=5, minutes=30)
    record = Diabetes()
    record.id = token_hex(3)
    record.datetime = now
    record.username = user.username
    record.pregnancies = data.pregnancies
    record.glucose = data.glucose
    record.blood_pressure = data.blood_pressure
    record.insulin = data.insulin
    record.bmi = data.bmi
    record.diabetes_pedigree_function = data.diabetes_pedigree_function
    record.age = data.age
    database.add(record)
    database.commit()


def get_diabetics(user: Users):
    try:
        query = database.query(Diabetes).filter_by(username=user.username).all()
        reports = []
        for report in query:
            reports.append(
                {
                    "id": report.id,
                    "timestamp": report.datetime.strftime("%Y-%m-%dT%H:%M:%S"),
                    "report": {
                        "pregnancies": report.pregnancies,
                        "glucose": report.glucose,
                        "blood_pressure": report.blood_pressure,
                        "insulin": report.insulin,
                        "bmi": report.bmi,
                        "diabetes_pedigree_function": report.diabetes_pedigree_function,
                        "age": report.age
                    }
                }
            )
        return reports
    except NoResultFound:
        return None


# TODO: Work on this function
def email_reports(user: Users):
    pass


def predict_diabetes(user: Users, data: Diabetics):
    if user is not None:
        add_diabetics(user, data)
    input_data = data.model_dump_json()
    input_dict = json.loads(input_data)
    pregnancies = int(input_dict["pregnancies"])
    glucose = int(input_dict["glucose"])
    blood_pressure = int(input_dict["blood_pressure"])
    insulin = int(input_dict["insulin"])
    bmi = int(input_dict["bmi"])
    diabetes_pedigree_function = int(input_dict["diabetes_pedigree_function"])
    age = int(input_dict["age"])
    data = array([pregnancies, glucose, blood_pressure, insulin, bmi, diabetes_pedigree_function, age]).reshape(1, -1)
    std_data = diabetics_scaler.transform(data)
    prediction = diabetics_mlmodel.predict(std_data)
    probability = diabetics_mlmodel.predict_proba(std_data)[:, 1]
    if probability < 0.2:
        return {
            "percentage": "20",
            "message": "Probability of Having Diabetes is Very Low",
            "Recommendation": [
                "Maintain Healthy Habits: Continue practicing healthy habits such as regular exercise and a balanced diet.",
                "Monitor Health Parameters: Keep track of your health parameters regularly to ensure they remain within healthy ranges.",
                "Stay Informed: Stay informed about diabetes prevention strategies and updates in medical knowledge to make informed decisions about your health"],
            "Precaution": [
                "Stay vigilant: Even though your risk is low, remain aware of any changes in your health status or lifestyle habits.",
                "Regular check-ups: Schedule periodic check-ups with healthcare professionals to monitor your health status and discuss any concerns."]
        }
    elif probability < 0.4:
        return {
            "percentage": "40",
            "message": "Probability of Having Diabetes is Low",
            "Recommendation": [
                "Continue Healthy Habits: Continue with healthy habits such as regular exercise and a balanced diet to maintain your low risk.",
                "Monitor Blood Sugar Levels: Periodically monitor your blood sugar levels to stay proactive about your health.",
                "Seek Guidance if Necessary: Consider consulting a healthcare professional for personalized advice on maintaining your low-risk status"],
            "Precaution": [
                "Proactive steps: Even though your risk is low, take proactive steps to prevent any increase in risk over time by maintaining healthy habits",
                "Regular screenings: Continue with regular health screenings as recommended by healthcare professionals to detect any changes early."]
        }
    elif probability < 0.6:
        return {
            "percentage": "60",
            "message": "Probability of Having Diabetes is Moderate",
            "Recommendation": [
                "Improve Lifestyle: Take proactive steps to improve your lifestyle, such as increasing physical activity and making healthier food choices",
                "Monitor Health Parameters: Monitor your blood sugar levels more frequently and seek guidance from healthcare professionals.",
                "Consult Healthcare Professionals: Consult a healthcare professional for guidance on diabetes prevention strategies tailored to your moderate risk level."],
            "Precaution": [
                "Lifestyle modifications: Implement lifestyle modifications promptly to reduce the risk of developing diabetes.",
                "Follow-up appointments: Attend regular follow-up appointments with healthcare professionals to track progress and adjust strategies as needed."]
        }
    elif probability < 0.8:
        return {
            "percentage": "80",
            "message": "Probability of Having Diabetes is High",
            "Recommendation": [
                "Take Immediate Action: Seek immediate guidance from a healthcare professional for a comprehensive assessment of your risk factors and follow any prescribed treatment plans.",
                "Strict Lifestyle Management: Follow a strict diet and exercise regimen as advised by healthcare providers.",
                "Regular Monitoring: Monitor blood sugar levels closely and adhere to any prescribed treatment plans."],
            "Precaution": [
                "Adherence to treatment: Strictly adhere to the prescribed treatment plan and lifestyle modifications recommended by healthcare professionals.",
                "Support network: Seek support from friends, family, or support groups to help manage the challenges associated with a higher risk of diabetes."]
        }
    else:
        return {
            "percentage": "100",
            "message": "Probability of Having Diabetes is Very High",
            "Recommendation": [
                "Immediate Action: Take immediate action to implement lifestyle changes and adhere to any prescribed treatment plans.",
                "Regular Monitoring and Support: Seek regular monitoring and support from healthcare professionals to manage your very high risk.",
                "`Education and Support: Educate yourself about diabetes management and complications, and consider joining diabetes education programs or support groups for additional guidance and support."],
            "Precaution": ["Urgency: Act promptly and decisively to manage the very high risk of diabetes.",
                           "Comprehensive approach: Implement a comprehensive approach to diabetes prevention and management, including lifestyle modifications, medication adherence, and regular monitoring."]
        }


def calculate_bmi(user: Users, data: dict):
    weight_kg = data["weight"]
    feet = data["feet"]
    inches = data["inches"]
    height_m = (feet * 0.3048) + (inches * 0.0254)
    bmi = weight_kg / (height_m ** 2)
    return {"bmi": bmi}

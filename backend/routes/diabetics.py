import json
import pickle

import numpy as np
from fastapi import APIRouter, status
from fastapi.responses import JSONResponse

from backend.models.diabetics import Diabetics

router = APIRouter(prefix="/diabetics")


@router.get("/")
async def root():
    return "Diabetics API"

ModelLocation = "Machine Learning/ML Models/Diabetics_logistic_model.sav"
ScalarLocation = "Machine Learning/ML Models/DiabeticsScaler.sav"

diabetics_mlmodel = pickle.load(open(ModelLocation, "rb"))
diabetics_scaler = pickle.load(open(ScalarLocation, "rb"))


@router.post("/predict")
async def predict_diabetics(input: Diabetics):
    input_data = input.model_dump_json()
    input_dict = json.loads(input_data)

    pregnancies = int(input_dict["pregnancies"])
    glucose = int(input_dict["glucose"])
    blood_pressure = int(input_dict["blood_pressure"])
    insulin = int(input_dict["insulin"])
    bmi = int(input_dict["bmi"])
    diabetes_pedigree_function = int(input_dict["diabetes_pedigree_function"])
    age = int(input_dict["age"])

    data = np.array([pregnancies,glucose,blood_pressure,insulin,bmi,diabetes_pedigree_function,age]).reshape(1, -1)

    std_data = diabetics_scaler.transform(data)

    prediction = diabetics_mlmodel.predict(std_data)
    probability = diabetics_mlmodel.predict_proba(std_data)[:, 1]

    if probability < 0.2:
        print("Probability of Having Diabetes is Very Low")
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "percentage": "20",
                "message": "Probability of Having Diabetes is Very Low",
                "Recommendation": "1.Maintain Healthy Habits: Continue practicing healthy habits such as regular exercise and a balanced diet. 2. Monitor Health Parameters: Keep track of your health parameters regularly to ensure they remain within healthy ranges. 3.Stay Informed: Stay informed about diabetes prevention strategies and updates in medical knowledge to make informed decisions about your health.",
                "Precaution" : " 1. Stay vigilant: Even though your risk is low, remain aware of any changes in your health status or lifestyle habits. 2. Regular check-ups: Schedule periodic check-ups with healthcare professionals to monitor your health status and discuss any concerns."
            }
        )
    elif probability < 0.4:
        print("Probability of Having Diabetes is Low")
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "percentage": "40",
                "message": "Probability of Having Diabetes is Low",
                "Recommendation" : " 1. Continue Healthy Habits: Continue with healthy habits such as regular exercise and a balanced diet to maintain your low risk. 2. Monitor Blood Sugar Levels: Periodically monitor your blood sugar levels to stay proactive about your health. 3. Seek Guidance if Necessary: Consider consulting a healthcare professional for personalized advice on maintaining your low-risk status",
                "Precaution" : " 1. Proactive steps: Even though your risk is low, take proactive steps to prevent any increase in risk over time by maintaining healthy habits 2. Regular screenings: Continue with regular health screenings as recommended by healthcare professionals to detect any changes early."
            }
        )
    elif probability < 0.6:
        print( "Probability of Having Diabetes is Moderate")
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "percentage": "60",
                "message": "Probability of Having Diabetes is Moderate",
                "Recommendation" : "1. Improve Lifestyle: Take proactive steps to improve your lifestyle, such as increasing physical activity and making healthier food choices.2. Monitor Health Parameters: Monitor your blood sugar levels more frequently and seek guidance from healthcare professionals. 3. Consult Healthcare Professionals: Consult a healthcare professional for guidance on diabetes prevention strategies tailored to your moderate risk level.",
                "Precaution" : "1. Lifestyle modifications: Implement lifestyle modifications promptly to reduce the risk of developing diabetes. 2. Follow-up appointments: Attend regular follow-up appointments with healthcare professionals to track progress and adjust strategies as needed."
            }
        )
    elif probability < 0.8:
        print("Probability of Having Diabetes is High")
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "percentage": "80",
                "message": "Probability of Having Diabetes is High",
                "Recommendation" : "1. Take Immediate Action: Seek immediate guidance from a healthcare professional for a comprehensive assessment of your risk factors and follow any prescribed treatment plans. 2. Strict Lifestyle Management: Follow a strict diet and exercise regimen as advised by healthcare providers. 3. Regular Monitoring: Monitor blood sugar levels closely and adhere to any prescribed treatment plans.",
                "Precaution" : "1. Adherence to treatment: Strictly adhere to the prescribed treatment plan and lifestyle modifications recommended by healthcare professionals. 2. Support network: Seek support from friends, family, or support groups to help manage the challenges associated with a higher risk of diabetes."
            }
        )
    else:
        print("Probability of Having Diabetes is Very High")
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "percentage": "100",
                "message": "Probability of Having Diabetes is Very High",
                "Recommendation" : "Immediate Action: Take immediate action to implement lifestyle changes and adhere to any prescribed treatment plans. 2. Regular Monitoring and Support: Seek regular monitoring and support from healthcare professionals to manage your very high risk. 3. Education and Support: Educate yourself about diabetes management and complications, and consider joining diabetes education programs or support groups for additional guidance and support.",
                "Precaution" : "1. Urgency: Act promptly and decisively to manage the very high risk of diabetes. 2. Comprehensive approach: Implement a comprehensive approach to diabetes prevention and management, including lifestyle modifications, medication adherence, and regular monitoring."
            }
        )


@router.post("/bmi")
async def bmi(data: dict):
    weight_kg = data["weight"]
    feet = data["feet"]
    inches = data["inches"]

    height_m = (feet * 0.3048) + (inches * 0.0254)

    bmi = weight_kg / (height_m ** 2)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "bmi": bmi
        }
    )

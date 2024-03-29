from fastapi import APIRouter, status
from fastapi.responses import JSONResponse
from Backend.models.diabetics import Diabetics
import pickle
import json
from sklearn.preprocessing import StandardScaler
import numpy as np

router = APIRouter(prefix="/diabetics")


@router.get("/")
async def root():
    return "Diabetics API"

ModelLocation = "Backend\Machine Learning\ML Models\Diabetics_logistic_model.sav"
ScalarLocation = "Backend\Machine Learning\ML Models\Diabeticsscaler.sav"

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
                    "message": "Probability of Having Diabetes is Very Low"
                },
        )
    elif probability < 0.4:
        print("Probability of Having Diabetes is Low")
        return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={
                    "percentage": "40",
                    "message": "Probability of Having Diabetes is Low"
                },
        )
    elif probability < 0.6:
        print( "Probability of Having Diabetes is Moderate")
        return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={
                    "percentage": "60",
                    "message": "Probability of Having Diabetes is Moderate"
                },
        )
    elif probability < 0.8:
        print("Probability of Having Diabetes is High")
        return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={
                    "percentage": "80",
                    "message": "Probability of Having Diabetes is High"
                },
        )
    else:
        print("Probability of Having Diabetes is Very High")
        return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={
                    "percentage": "100",
                    "message": "Probability of Having Diabetes is Very High"
                },
        )

    
            

    
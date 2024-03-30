from fastapi import APIRouter, Depends, status
from fastapi.exceptions import HTTPException
from fastapi.responses import JSONResponse

from backend.crud import manager
from backend.crud import predict_diabetes, calculate_bmi
from backend.schemas import Diabetics

router = APIRouter(prefix="/diabetics")


@router.post("/predict")
async def predict_diabetics(data: Diabetics, user=Depends(manager.optional)):
    try:
        response = predict_diabetes(user, data)
        return JSONResponse(status_code=status.HTTP_200_OK, content=response)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.post("/bmi")
async def bmi(data: dict, user=Depends(manager.optional)):
    try:
        response = calculate_bmi(user, data)
        return JSONResponse(status_code=status.HTTP_200_OK, content=response)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

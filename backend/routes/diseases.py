from fastapi import APIRouter, Depends, status
from fastapi.exceptions import HTTPException
from fastapi.responses import JSONResponse
from typing import List
from backend.crud import predict_diseases
from backend.crud import manager
from backend.schemas import Diabetics

router = APIRouter(prefix="/diseases")


@router.post("/predict")
async def predict_diseases(data : List[str], user=Depends(manager.optional)):
    try:
        response = predict_diseases(user, data)
        return JSONResponse(status_code=status.HTTP_200_OK, content=response)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )




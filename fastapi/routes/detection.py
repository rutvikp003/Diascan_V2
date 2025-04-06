from fastapi import APIRouter, HTTPException
from db import db
from models import DetectionResult
import traceback

router = APIRouter()

@router.post("/save_detection")
async def save_assessment(data: DetectionResult):
    try:
        # Convert Pydantic model to dictionary
        assessment_dict = data.model_dump(mode="python")

        # Insert data into MongoDB
        result = await db.detection_collection.insert_one(assessment_dict)

        # Convert ObjectId to string before returning
        assessment_dict["_id"] = str(result.inserted_id)

        return {
            "message": "Detection data saved successfully!",
            "assessment_id": assessment_dict["_id"],
            "data": assessment_dict
        }
    
    except Exception as e:
        print("Error Occurred:", str(e))
        print(traceback.format_exc())  # Print full error traceback
        raise HTTPException(status_code=500, detail=str(e))

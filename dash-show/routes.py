from datetime import datetime
from fastapi import APIRouter, HTTPException
from pymongo import DESCENDING
from database import get_database  # Function to connect to MongoDB
from bson import ObjectId

def convert_document(doc):
    doc["_id"] = str(doc["_id"])  # Convert ObjectId
    if isinstance(doc.get("timestamp"), datetime):
        doc["timestamp"] = doc["timestamp"].isoformat()  # Convert datetime
    return doc

router = APIRouter()

@router.get("/dashboard-data/{Email}")
def get_user_dashboard_data(Email: str):
    """
    Fetches the last 2 assessment records for the given user from the 'detections' collection.
    """
    db = get_database()  # Get MongoDB connection
    detections_collection = db["detections"]  # Access the 'detections' collection

    # Find the last 2 assessments for the user, sorted by `assessment_date` in descending order
    user_data = list(detections_collection.find({"Email": Email}).sort("timestamp", -1).limit(2))
    if not user_data:
        raise HTTPException(status_code=404, detail="No assessment data found for this user")

    cleaned_data = [convert_document(doc) for doc in user_data]
    return {"data": cleaned_data}


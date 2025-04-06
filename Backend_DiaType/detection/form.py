from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import numpy as np
import joblib

# ----------- Setup FastAPI App ----------- #
app = FastAPI()

# ----------- Allow frontend access ----------- #
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------- Load Trained Model ----------- #
model = joblib.load(r"C:\Users\Rutvik\Desktop\Diascan_main\Diascan\Backend_DiaType\detection\diabetes_model.pkl")

# ----------- Request Body Schema ----------- #
class PredictRequest(BaseModel):
    age: int
    glucose: int
    bloodPressure: int
    insulin: int
    bmi: float
    diabetesPedigree: float

# ---------- Prediction Endpoint ----------- #
@app.post("/predict")
async def predict(payload: PredictRequest):
    try:
        features = np.array([[payload.age, payload.glucose, payload.bloodPressure,
                            payload.insulin, payload.bmi, payload.diabetesPedigree]])
        prediction = model.predict(features)
        result = "Diabetic" if prediction[0] == 1 else "Not Diabetic"
        return {"prediction": result}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

# ----------- Run the app with Uvicorn ----------- #
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("form:app", host="127.0.0.1", port=8001, reload=True)
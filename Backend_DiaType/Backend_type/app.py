from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import joblib
import traceback
import uvicorn


app = FastAPI()

# CORS to allow frontend access (localhost dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------- MODELS TO LOAD ---------------------
# Load diabetes type classifier
type_model = joblib.load(r"C:\Users\Rutvik\Desktop\Diascan_main\Diascan\Backend_DiaType\Backend_type\saved_models\type_model.pkl")
le_type = joblib.load(r"C:\Users\Rutvik\Desktop\Diascan_main\Diascan\Backend_DiaType\Backend_type\saved_models\le_type.pkl")
# Label encoders
le_heart = joblib.load(r"C:\Users\Rutvik\Desktop\Diascan_main\Diascan\Backend_DiaType\Backend_type\saved_models\le_heart.pkl")
le_kidney = joblib.load(r"C:\Users\Rutvik\Desktop\Diascan_main\Diascan\Backend_DiaType\Backend_type\saved_models\le_kidney.pkl")
le_nerve = joblib.load(r"C:\Users\Rutvik\Desktop\Diascan_main\Diascan\Backend_DiaType\Backend_type\saved_models\le_nerve.pkl")
le_eye = joblib.load(r"C:\Users\Rutvik\Desktop\Diascan_main\Diascan\Backend_DiaType\Backend_type\saved_models\le_eye.pkl")
le_complication = joblib.load(r"C:\Users\Rutvik\Desktop\Diascan_main\Diascan\Backend_DiaType\Backend_type\saved_models\le_complication.pkl")

# Risk Models Dictionary
risk_models = {
    "Type 1 Diabetes": {
        "Heart_Disease_": joblib.load(r"C:\Users\Rutvik\Desktop\Diascan_main\Diascan\Backend_DiaType\Backend_type\saved_models\Type 1 Diabetes_Heart_Disease_model.pkl"),
        "Kidney_Issues": joblib.load(r"C:\Users\Rutvik\Desktop\Diascan_main\Diascan\Backend_DiaType\Backend_type\saved_models\Type 1 Diabetes_Kidney_Issues_model.pkl"),
        "Nerve_Damage": joblib.load(r"C:\Users\Rutvik\Desktop\Diascan_main\Diascan\Backend_DiaType\Backend_type\saved_models\Type 1 Diabetes_Nerve_Damage_model.pkl"),
        "Eye_Problems": joblib.load(r"C:\Users\Rutvik\Desktop\Diascan_main\Diascan\Backend_DiaType\Backend_type\saved_models\Type 1 Diabetes_Eye_Problems_model.pkl"),
        "complication": joblib.load(r"C:\Users\Rutvik\Desktop\Diascan_main\Diascan\Backend_DiaType\Backend_type\saved_models\Type 1 Diabetes_complication_model.pkl"),
    },
    "Type 2 Diabetes": {
        "Heart_Disease_": joblib.load(r"C:\Users\Rutvik\Desktop\Diascan_main\Diascan\Backend_DiaType\Backend_type\saved_models\Type 2 Diabetes_Heart_Disease_model.pkl"),
        "Kidney_Issues": joblib.load(r"C:\Users\Rutvik\Desktop\Diascan_main\Diascan\Backend_DiaType\Backend_type\saved_models\Type 2 Diabetes_Kidney_Issues_model.pkl"),
        "Nerve_Damage": joblib.load(r"C:\Users\Rutvik\Desktop\Diascan_main\Diascan\Backend_DiaType\Backend_type\saved_models\Type 2 Diabetes_Nerve_Damage_model.pkl"),
        "Eye_Problems": joblib.load(r"C:\Users\Rutvik\Desktop\Diascan_main\Diascan\Backend_DiaType\Backend_type\saved_models\Type 2 Diabetes_Eye_Problems_model.pkl"),
        "complication": joblib.load(r"C:\Users\Rutvik\Desktop\Diascan_main\Diascan\Backend_DiaType\Backend_type\saved_models\Type 2 Diabetes_complication_model.pkl"),
    },
}

# --------------------- INPUT MODEL ---------------------
class InputData(BaseModel):
    Age: float
    BMI: float
    Fasting_Glucose: float
    HbA1c: float
    C_Peptide: float
    Insulin_Level: float
    Autoantibody_Presence: int

@app.post("/predict")
def predict(input: InputData):
    try:
        # Create input array
        sample_input = np.array([
            input.Age,
            input.BMI,
            input.Fasting_Glucose,
            input.HbA1c,
            input.C_Peptide,
            input.Insulin_Level,
            input.Autoantibody_Presence
        ]).reshape(1, -1)

        # Predict Diabetes Type
        type_pred = type_model.predict(sample_input)
        type_label = le_type.inverse_transform(type_pred)[0]

        # Predict complications
        models = risk_models[type_label]
        heart_pred = le_heart.inverse_transform(models["Heart_Disease_"].predict(sample_input))[0]
        kidney_pred = le_kidney.inverse_transform(models["Kidney_Issues"].predict(sample_input))[0]
        nerve_pred = le_nerve.inverse_transform(models["Nerve_Damage"].predict(sample_input))[0]
        eye_pred = le_eye.inverse_transform(models["Eye_Problems"].predict(sample_input))[0]
        complication_pred = le_complication.inverse_transform(models["complication"].predict(sample_input))[0]

        # Calculate Overall Probability
        total_confidence = 0
        count = 0
        for label, encoder in zip(
            ['Heart_Disease_', 'Kidney_Issues', 'Nerve_Damage', 'Eye_Problems'],
            [le_heart, le_kidney, le_nerve, le_eye]
        ):
            model = models[label]
            probs = model.predict_proba(sample_input)[0]
            pred_idx = np.argmax(probs)
            pred_label = encoder.inverse_transform([pred_idx])[0]
            confidence = probs[pred_idx]

            if pred_label != "None":
                total_confidence += confidence
                count += 1

        overall_probability = (total_confidence / count) * 100 if count > 0 else 0.0
        overall_probability = round(overall_probability, 1)

        return {
            "Diabetes_Type": type_label,
            "Heart_Disease": heart_pred,
            "Kidney_Issues": kidney_pred,
            "Nerve_Damage": nerve_pred,
            "Eye_Problems": eye_pred,
            "Diabetes_Complications": complication_pred,
            "Overall_Damage_Probability": f"{overall_probability}%"
        }

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

# 👇 To run with: python app.py
if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)

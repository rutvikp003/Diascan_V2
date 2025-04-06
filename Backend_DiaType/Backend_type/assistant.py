# diabetes_chatbot.py
import pandas as pd
import numpy as np
import joblib

# Load models and encoders
type_model = joblib.load("saved_models/type_model.pkl")
le_type = joblib.load("saved_models/le_type.pkl")
le_complication = joblib.load("saved_models/le_complication.pkl")
le_heart = joblib.load("saved_models/le_heart.pkl")
le_kidney = joblib.load("saved_models/le_kidney.pkl")
le_nerve = joblib.load("saved_models/le_nerve.pkl")
le_eye = joblib.load("saved_models/le_eye.pkl")

# Load all disease models
risk_models = {
    "Type 1 Diabetes": {},
    "Type 2 Diabetes": {}
}

diabetes_types = ["Type 1 Diabetes", "Type 2 Diabetes"]
diseases = ["complication", "Heart_Disease_", "Kidney_Issues", "Nerve_Damage", "Eye_Problems"]

for dtype in diabetes_types:
    for dis in diseases:
        filename = f"saved_models/{dtype}_{dis}_model.pkl"
        try:
            risk_models[dtype][dis] = joblib.load(filename)
        except:
            pass

# === Chatbot Recommendation Engine ===
def get_diabetes_plan(patient_input_df):
    pred_type = type_model.predict(patient_input_df)[0]
    type_label = le_type.inverse_transform([pred_type])[0]

    risk_score = 0
    model_group = risk_models[type_label]

    for label, model in model_group.items():
        if label == "complication":
            continue
        probs = model.predict_proba(patient_input_df)[0]
        confidence = max(probs)
        risk_score += confidence

    avg_risk = risk_score / (len(model_group) - 1)

    # Decision-tree like logic for plans
    plan = [f"🧬 Diabetes Type: {type_label}"]
    if type_label == "Type 1 Diabetes":
        if avg_risk >= 0.75:
            plan += [
                "💉 Recommended: Insulin therapy",
                "🥗 Diet: Strict carb control",
                "🏋️ Exercise: Light activity, avoid glucose dips"
            ]
        else:
            plan += [
                "📋 Monitor glucose levels regularly",
                "🥗 Balanced carb intake",
                "🏃 Moderate exercise routine"
            ]
    elif type_label == "Type 2 Diabetes":
        bmi = patient_input_df["BMI"].values[0]
        if bmi >= 30:
            plan += [
                "🥗 Diet: Low-carb, high-fiber foods",
                "🏃 Exercise: 45 mins daily walking or cycling",
                "💊 Medication: Consider Metformin"
            ]
        elif avg_risk >= 0.75:
            plan += [
                "🍽️ Diet: Controlled calories, avoid sugar",
                "🏃 Exercise: Weight loss focused",
                "📋 Monitor complications closely"
            ]
        else:
            plan += [
                "🥦 Diet: Low sugar, moderate portions",
                "🚶‍♂️ Exercise: 30 mins daily",
                "💧 Stay hydrated and get regular checkups"
            ]

    return "\n".join(plan)

# === Example chatbot simulation ===
if __name__ == "__main__":
    # Simulate a user message to chatbot
    patient_input = pd.DataFrame([{
        "Age": 11,
        "BMI": 36.6,
        "Fasting_Glucose": 192,
        "HbA1c": 11.8,
        "C_Peptide": 4.41,
        "Insulin_Level": 15.2,
        "Autoantibody_Presence": 1
    }])

    print("🤖 AI Diabetes Assistant:\n")
    print(get_diabetes_plan(patient_input))

"use client";

import { useState, useEffect} from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card1";
import { Button } from "@/components/ui/button";

const TypeClassifier = () => {
  useEffect(() => {
    document.title = "Risk check | Diascan";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", "Sign in to access Diascan features.");
  }, []);

  const [formData, setFormData] = useState({
    Age: "",
    BMI: "",
    Fasting_Glucose: "",
    HbA1c: "",
    C_Peptide: "",
    Insulin_Level: "",
    Autoantibody_Presence: "",
  });
  const [result, setResult] = useState<any>(null);

  const [savedSuccessfully, setSavedSuccessfully] = useState(false);

  const [error, setError] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateFields = () => {
    for (const key in formData) {
      if (!formData[key as keyof typeof formData]) {
        return `Please enter a valid value for ${key.replace(/_/g, " ")}.`;
      }
    }
    return null;
  };

const handleSubmit = async () => {
  const validationError = validateFields();
  if (validationError) {
    setError(validationError);
    setResult(null);
    return;
  }

  setError("");

  try {
    // Step 1️⃣: Predict Diabetes Type
    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Age: parseFloat(formData.Age),
        BMI: parseFloat(formData.BMI),
        Fasting_Glucose: parseFloat(formData.Fasting_Glucose),
        HbA1c: parseFloat(formData.HbA1c),
        C_Peptide: parseFloat(formData.C_Peptide),
        Insulin_Level: parseFloat(formData.Insulin_Level),
        Autoantibody_Presence: parseInt(formData.Autoantibody_Presence),
      }),
    });

    let data = await response.json();
    if (!response.ok) throw new Error(data.detail || "Prediction failed.");

    setResult(data); // Show prediction result

    // Step 2️⃣: Save Detection Result Automatically (Requires Auth)
    const token = localStorage.getItem("token");
    const Email = localStorage.getItem("Email").replace(/"/g, "");; // ✅ Get Email

    if (!token || !Email) {
      alert("Sign in to save your data and track progress!");
      return;
    }

    const saveResponse = await fetch("http://localhost:8002/api/save_detection/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        Email, // Replace with actual Email
        age: parseInt(formData.Age),
        bmi: parseFloat(formData.BMI),
        fasting_glucose: parseFloat(formData.Fasting_Glucose),
        hba1c: parseFloat(formData.HbA1c),
        c_peptide: parseFloat(formData.C_Peptide),
        insulin_level: parseFloat(formData.Insulin_Level),
        autoantibody_presence: parseInt(formData.Autoantibody_Presence),
        diabetes_type: data.Diabetes_Type,
        heart_disease: data.Heart_Disease,
        kidney_issues: data.Kidney_Issues,
        nerve_damage: data.Nerve_Damage,
        eye_problems: data.Eye_Problems,
        diabetes_complications: data.Diabetes_Complications,
        overall_damage_probability: data.Overall_Damage_Probability,
        saved: true, // ✅ Mark as saved
      }),
    });

    const saveData = await saveResponse.json();
    if (!saveResponse.ok) throw new Error(saveData.detail || "Error saving data.");

    alert("Data saved successfully!");

    // Step 3️⃣: Show action buttons after saving
    setSavedSuccessfully(true);

  } catch (err: any) {
    setError(err.message || "Something went wrong.");
  }
};


  return (
    <>
      <section className="relative z-10 overflow-hidden bg-gray-200 pb-16 pt-[80px] dark:bg-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="mt-10">
              <h1 className="text-3xl font-bold text-center text-gray-900 mb-6 dark:text-gray-100">
                Diabetes Type Classifier
              </h1>
              <p className="mb-6 text-xl text-dark dark:text-gray-200">
                Fill in the details to check your diabetes risk.
              </p>
            </div>
            <div className="flex flex-col item-center w-full max-w-2xl bg-gray-300 p-10 rounded-lg shadow-lg dark:bg-gray-900">
              <div className="grid gap-4">
              {Object.entries(formData).map(([field, value]) => (
                  <div key={field} className="flex flex-col">
                    <label
                      htmlFor={field}
                      className="mb-2 text-gray-800 font-medium dark:text-gray-200"
                    >
                      {field.replace(/_/g, " ")}
                    </label>
                    <input
                      id={field}
                      className="w-full p-3 rounded-lg bg-dark-100 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                      type="number"
                      name={field}
                      placeholder={`${field.replace(/_/g, " ")}`}
                      value={value}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                ))}
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full md:w-auto self-center text-lg mt-6 py-3 px-6"
              >
                Predict Diabetes Type
              </Button>

              {error && (
                <p className="text-red-500 mt-2 text-center text-sm md:text-base">
                  {error}
                </p>
              )}
            </div>

            {result && (
              <Card className="p-6 w-full max-w-lg mt-10 bg-gray-800 text-white rounded-lg shadow-lg">
                <h2 className="text-xl md:text-2xl text-gray-800 font-semibold mb-4">
                  Prediction Result
                </h2>
                <div className="grid gap-2 text-sm text-gray-800 md:text-base">
                  <p>
                    <strong>Diabetes Type:</strong> {result.Diabetes_Type}
                  </p>
                  <p>
                    <strong>Heart Disease:</strong> {result.Heart_Disease}
                  </p>
                  <p>
                    <strong>Kidney Issues:</strong> {result.Kidney_Issues}
                  </p>
                  <p>
                    <strong>Nerve Damage:</strong> {result.Nerve_Damage}
                  </p>
                  <p>
                    <strong>Eye Problems:</strong> {result.Eye_Problems}
                  </p>
                  <p>
                    <strong>Complications:</strong> {result.Diabetes_Complications}
                  </p>
                  <p>
                    <strong>Overall Damage Probability:</strong>{" "}
                    <span className="text-yellow-500">
                      {result.Overall_Damage_Probability}
                    </span>
                  </p>
                </div>
              </Card>
            )}

            {savedSuccessfully && (
              <>
                <p className="text-2xl mt-12 mb-12 text-black dark:text-gray-300">
                  📊 get your Dashboard and Diat Plans
                </p>
                <div className="flex gap-4 mt-6">
                  <Link href="/dashboard">
                    <Button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded-lg">
                      View Dashboard
                    </Button>
                  </Link>
                  {/* <Link href="/health-plans">
                    <Button className="bg-green-500 hover:bg-green-700 text-white py-2 px-6 rounded-lg">
                      View Health Plans
                    </Button>
                  </Link> */}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default TypeClassifier;

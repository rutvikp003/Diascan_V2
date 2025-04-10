"use client";

import { useRef, useState, useEffect} from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const DiabetesDetectionForm = () => {
  useEffect(() => {
    document.title = "Diabetes check | Diascan";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", "Sign in to access Diascan features.");
  }, []);

  const formRef = useRef<HTMLFormElement>(null);
  const [dpf, setDpf] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const [showbtn, setshowbtn] = useState(false);

  const handleDPFCalculation = () => {
    if (!formRef.current) return;

    const relatives = Number(
      (formRef.current.elements.namedItem("relatives") as HTMLInputElement)?.value || "0"
    );
    const closeness = Number(
      (formRef.current.elements.namedItem("closeness") as HTMLInputElement)?.value || "0"
    );

    if (relatives > 0 && closeness > 0) {
      const calculatedDPF = (relatives * closeness) / 100;
      setDpf(calculatedDPF);
    } else {
      setDpf(null);
    }
  };

  // Form Submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formRef.current) return;

    setLoading(true);
    setResult(null);

    const formData = new FormData(formRef.current);
    const data = {
      age: Number(formData.get("age")),
      glucose: Number(formData.get("glucose")),
      bloodPressure: Number(formData.get("bloodPressure")),
      insulin: Number(formData.get("insulin")),
      bmi: Number(formData.get("bmi")),
      diabetesPedigree: dpf || 0,
    };

    try {
      const res = await fetch("http://localhost:8001/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (res.ok) {
        setResult(json.prediction);
      } else {
        setResult("Error: " + json.error);
      }
      setshowbtn(true);
    } catch (err) {
      setResult("Request failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[900px] text-center">
              <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white">
                Smart Diabetes Detection
              </h1>
              <p className="mb-12 text-black dark:text-white">
                Fill in the details to check your diabetes risk.
              </p>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="max-w-3xl mx-auto bg-white p-10 rounded-lg shadow-lg dark:bg-dark"
            >
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-white font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                  className="border-stroke dark:text-white dark:shadow-lg w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-dark outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                />
              </div>
              {/* Age, Glucose, Blood Pressure, Insulin, BMI */}
              {["age", "glucose", "bloodPressure", "insulin", "bmi"].map((field) => (
                <div key={field} className="mb-4">
                  <label className="block text-gray-700 dark:text-white font-semibold">
                    {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type="number"
                    name={field}
                    placeholder={field.replace(/_/g, " ")}
                    required
                    className="border-stroke dark:text-white dark:shadow-lg w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-dark outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                </div>
              ))}

              {/* DPF Calculation */}
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Diabetes Pedigree Function
                </h3>
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Number of Relatives with Diabetes
                  </label>
                  <input
                    type="number"
                    name="relatives"
                    className="border-stroke dark:text-white dark:shadow-lg w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-dark outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    onChange={handleDPFCalculation}
                  />
                </div>

                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Closeness Factor (1-10)
                  </label>
                  <input
                    type="number"
                    name="closeness"
                    min="1"
                    max="10"
                    className="border-stroke dark:text-white dark:shadow-lg w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-dark outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    onChange={handleDPFCalculation}
                  />
                </div>

                {dpf !== null && (
                  <motion.div
                    className="mt-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Calculated DPF
                    </label>
                    <input
                      type="text"
                      value={dpf.toFixed(2)}
                      readOnly
                      className="border-stroke dark:text-white dark:shadow-lg w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-dark outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </motion.div>
                )}
              </div>

              {/* Submit Button */}
              <div className="mt-6 text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className={`inline-block px-6 py-3 rounded-md transition ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary text-white hover:bg-primary/80"
                  }`}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>

              {/* Result Message */}
              {result && (
                <p className="mt-4 text-center font-semibold text-blue-500 dark:text-blue-400">
                  {result}
                </p>
              )}
            </form>
            {showbtn &&(
              <>
                <div className="mx-auto max-w-[900px] text-center">
                  <p className="text-2xl mt-12 mb-12 text-black dark:text-gray-300">
                    ✅Check Further your diabetes type and risk.
                  </p>
                  <Link
                    href="/Diabetes_type"  
                    className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                    >
                      Check Now
                  </Link>
                </div>
              </>
            )}

          </div>
          <div className="absolute left-0 top-0 z-[-1]">
            <svg
              width="1440"
              height="969"
              viewBox="0 0 1440 969"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_95:1005"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="1440"
                height="969"
              >
                <rect width="1440" height="969" fill="#090E34" />
              </mask>
              <g mask="url(#mask0_95:1005)">
                <path
                  opacity="0.1"
                  d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                  fill="url(#paint0_linear_95:1005)"
                />
                <path
                  opacity="0.1"
                  d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                  fill="url(#paint1_linear_95:1005)"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_95:1005"
                  x1="1178.4"
                  y1="151.853"
                  x2="780.959"
                  y2="453.581"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#4A6CF7" />
                  <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_95:1005"
                  x1="160.5"
                  y1="220"
                  x2="1099.45"
                  y2="1192.04"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#4A6CF7" />
                  <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiabetesDetectionForm;
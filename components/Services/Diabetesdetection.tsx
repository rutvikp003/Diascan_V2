"use client"; // Ensure this runs as a client component

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DiabetesDetectionService = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      setFile(null);
      alert("Please upload a valid PDF file.");
    }
  };

  // Handle file upload and navigation
  const handleUpload = () => {
    if (file) {
      router.push("/diabetes-detection/upload");
    } else {
      alert("Please select a valid PDF file before proceeding.");
    }
  };

  return (<>
    <section 
      id="diabetes-detection" 
      className="py-16 md:py-20 lg:py-28 "
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Diabetes Detection
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Take control of your health with our advanced diabetes detection system. Choose from two simple options to check your risk—upload a medical report for analysis or manually enter your details for an instant evaluation.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              🔍 Why Choose Our Detection System?
            </h3>
            <ul className="space-y-3 text-gray-800 dark:text-gray-300">
              <li className="flex items-center">
                 <b>Accurate Analysis:</b> Get instant insights based on your health data.
              </li>
              <li className="flex items-center">
                 <b>Easy & Convenient:</b> Upload reports or manually enter details effortlessly.
              </li>
              <li className="flex items-center">
                 <b>Secure & Private:</b> Your health information remains confidential and protected.
              </li>
              <li className="flex items-center">
                 <b>Expert-Backed:</b> Powered by medical research and prediction models.
              </li>
            </ul>

            {/* Buttons Section */}
            <div className="mt-8 space-y-6">
              
              {/* PDF Upload Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  📄 Detect via Report Upload
                </h3>
                <p className="text-gray-700 dark:text-gray-400 mb-2">
                  Upload your blood test report (PDF) for diabetes detection in seconds.
                </p>

                <input
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  id="ocrFile"
                  onChange={handleUpload}
                />

                <label htmlFor="ocrFile" className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700">
                  📎 Upload for Auto-Fill
                </label>
              </div>

              {/* Manual Input Button */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  ✍️ Detect via Manual Input
                </h3>
                <p className="text-gray-700 dark:text-gray-400 mb-2">
                  Enter your health parameters (glucose, BMI, age, etc.) and get an instant Diabetes Detection.
                </p>
                <button
                  onClick={() => router.push("/DiabetesForm")}
                  className="w-full sm:w-auto px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:from-green-600 hover:to-teal-600 transition shadow-lg"
                >
                  Enter Values & Detect
                </button>
              </div>
            </div>

            <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                🔬 How Our Detection Works
              </h3>
              <p className="text-gray-700 dark:text-gray-400">
                Our machine-learning model analyzes various health indicators and predicts diabetes risk with high accuracy. The model is trained on vast medical datasets to ensure reliable results.
              </p>
            </div>
          </div>

          {/* Right Image + Additional Content */}
          <div className="relative w-full max-w-lg mx-auto">
            <Image
              src="/images/Features/feature1.jpg"
              alt="Diabetes Detection"
              width={500}
              height={500}
              className="rounded-xl shadow-xl"
            />
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
    </>
  );
};

export default DiabetesDetectionService;

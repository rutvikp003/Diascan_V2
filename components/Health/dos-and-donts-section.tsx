"use client"

import { useState } from "react"

export function DosAndDontsSection() {
  const [activeTab, setActiveTab] = useState("dos")

  const dos = [
    "Monitor your blood sugar regularly",
    "Stay hydrated throughout the day",
    "Eat meals at consistent times",
    "Include fiber-rich foods in your diet",
    "Get regular physical activity",
    "Take medications as prescribed",
  ]

  const donts = [
    "Skip meals or medication doses",
    "Consume sugary beverages regularly",
    "Ignore symptoms of high or low blood sugar",
    "Eat large portions of carbohydrates at once",
    "Stay sedentary for long periods",
    "Smoke or consume excessive alcohol",
  ]

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">✅ Do's & Don'ts</h2>

      <div className="md:hidden">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("dos")}
            className={`flex-1 py-3 font-medium text-sm ${
              activeTab === "dos" ? "text-blue-600 border-b-2 border-blue-500" : "text-gray-500 hover:text-blue-600"
            }`}
          >
            Do's
          </button>
          <button
            onClick={() => setActiveTab("donts")}
            className={`flex-1 py-3 font-medium text-sm ${
              activeTab === "donts" ? "text-red-600 border-b-2 border-red-500" : "text-gray-500 hover:text-red-600"
            }`}
          >
            Don'ts
          </button>
        </div>

        <div className={activeTab === "dos" ? "block" : "hidden"}>
          <div className="border border-blue-100 rounded-lg overflow-hidden">
            <div className="bg-blue-200 px-4 py-3 border-b border-blue-100">
              <h3 className="text-blue-700 font-medium flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Do's
              </h3>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {dos.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={activeTab === "donts" ? "block" : "hidden"}>
          <div className="border border-red-100 rounded-lg overflow-hidden">
            <div className="bg-red-200 px-4 py-3 border-b border-red-100">
              <h3 className="text-red-700 font-medium flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
                Don'ts
              </h3>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {donts.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0"
                    >
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:grid do md:grid-cols-2 gap-6">
        <div className="border border-blue-100 bg-white rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
            <h3 className="text-blue-700 font-medium flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Do's
            </h3>
          </div>
          <div className="p-4">
            <ul className="space-y-2">
              {dos.map((item, index) => (
                <li key={index} className="flex items-start text-dark gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border border-red-100 bg-white rounded-lg overflow-hidden">
          <div className="bg-red-50 px-4 py-3 border-b border-red-100">
            <h3 className="text-red-700 font-medium flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
              Don'ts
            </h3>
          </div>
          <div className="p-4">
            <ul className="space-y-2">
              {donts.map((item, index) => (
                <li key={index} className="flex items-start text-dark gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

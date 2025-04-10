"use client"

import { useState } from "react"

export function DietPlansSection() {
  const [activeTab, setActiveTab] = useState("breakfast")

  const breakfastItems = [
    {
      icon: (
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
          className="h-5 w-5 text-blue-500"
        >
          <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
          <line x1="6" x2="6" y1="2" y2="4"></line>
          <line x1="10" x2="10" y1="2" y2="4"></line>
          <line x1="14" x2="14" y1="2" y2="4"></line>
        </svg>
      ),
      name: "Greek Yogurt Parfait",
      description: "Greek yogurt with berries and a sprinkle of nuts",
      glycemicIndex: "Low GI: 25",
    },
    {
      icon: (
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
          className="h-5 w-5 text-blue-500"
        >
          <path d="M12 22a8 8 0 0 0 8-8c0-5-8-13-8-13S4 9 4 14a8 8 0 0 0 8 8Z"></path>
        </svg>
      ),
      name: "Overnight Oats",
      description: "Steel-cut oats with cinnamon and apple slices",
      glycemicIndex: "Medium GI: 55",
    },
    {
      icon: (
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
          className="h-5 w-5 text-blue-500"
        >
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
          <path d="M7 2v20"></path>
          <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
        </svg>
      ),
      name: "Veggie Omelette",
      description: "Egg whites with spinach, tomatoes, and feta cheese",
      glycemicIndex: "Low GI: 15",
    },
  ]

  const lunchItems = [
    {
      icon: (
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
          className="h-5 w-5 text-blue-500"
        >
          <path d="M7 21h10"></path>
          <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"></path>
          <path d="M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1"></path>
          <path d="m13 12 4-4"></path>
          <path d="M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2"></path>
        </svg>
      ),
      name: "Quinoa Salad",
      description: "Quinoa with mixed vegetables and olive oil dressing",
      glycemicIndex: "Low GI: 35",
    },
    {
      icon: (
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
          className="h-5 w-5 text-blue-500"
        >
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
          <path d="M7 2v20"></path>
          <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
        </svg>
      ),
      name: "Grilled Chicken Wrap",
      description: "Whole grain wrap with grilled chicken and avocado",
      glycemicIndex: "Medium GI: 45",
    },
    {
      icon: (
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
          className="h-5 w-5 text-blue-500"
        >
          <path d="M7 21h10"></path>
          <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"></path>
          <path d="M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1"></path>
          <path d="m13 12 4-4"></path>
          <path d="M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2"></path>
        </svg>
      ),
      name: "Mediterranean Bowl",
      description: "Chickpeas, cucumber, tomatoes with tzatziki sauce",
      glycemicIndex: "Low GI: 30",
    },
  ]

  const dinnerItems = [
    {
      icon: (
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
          className="h-5 w-5 text-blue-500"
        >
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
          <path d="M7 2v20"></path>
          <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
        </svg>
      ),
      name: "Baked Salmon",
      description: "Salmon with roasted vegetables and quinoa",
      glycemicIndex: "Low GI: 20",
    },
    {
      icon: (
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
          className="h-5 w-5 text-blue-500"
        >
          <path d="M7 21h10"></path>
          <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"></path>
          <path d="M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1"></path>
          <path d="m13 12 4-4"></path>
          <path d="M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2"></path>
        </svg>
      ),
      name: "Vegetable Stir-Fry",
      description: "Tofu and mixed vegetables with brown rice",
      glycemicIndex: "Medium GI: 50",
    },
    {
      icon: (
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
          className="h-5 w-5 text-blue-500"
        >
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
          <path d="M7 2v20"></path>
          <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
        </svg>
      ),
      name: "Turkey Meatballs",
      description: "Lean turkey meatballs with zucchini noodles",
      glycemicIndex: "Low GI: 25",
    },
  ]

  return (
    <section className="py-12 shadow-xl">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">🍽️ Diet Plans</h2>
      <div className="w-full">
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab("breakfast")}
            className={`flex-1 py-3 font-medium text-sm ${
              activeTab === "breakfast"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-900 dark:text-gray-100 hover:text-blue-300"
            }`}
          >
            Breakfast
          </button>
          <button
            onClick={() => setActiveTab("lunch")}
            className={`flex-1 py-3 font-medium text-sm ${
              activeTab === "lunch" 
              ? "text-blue-500 border-b-2 border-blue-400" 
              : "text-gray-900 dark:text-gray-100 hover:text-blue-300"
            }`}
          >
            Lunch
          </button>
          <button
            onClick={() => setActiveTab("dinner")}
            className={`flex-1 py-3 font-medium text-sm ${
              activeTab === "dinner" 
              ? "text-blue-500 border-b-2 border-blue-500" 
              : "text-gray-900 dark:text-gray-100 hover:text-blue-600"
            }`}
          >
            Dinner
          </button>
        </div>

        <div className={`${activeTab === "breakfast" ? "block" : "hidden"}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {breakfastItems.map((item, index) => (
              <div
                key={index}
                className="border border-blue-100 bg-white text-dark rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
              >
                <div className="flex items-center gap-2 pb-2">
                  {item.icon}
                  <h3 className="text-lg font-medium">{item.name}</h3>
                </div>
                <div className="pt-2">
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <div className="inline-block px-2 py-1 bg-blue-100 text-dark text-xs font-medium rounded">
                    {item.glycemicIndex}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${activeTab === "lunch" ? "block" : "hidden"}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lunchItems.map((item, index) => (
              <div
                key={index}
                className="border border-blue-100 bg-white text-dark rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
              >
                <div className="flex items-center gap-2 pb-2">
                  {item.icon}
                  <h3 className="text-lg font-medium">{item.name}</h3>
                </div>
                <div className="pt-2">
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <div className="inline-block px-2 py-1 bg-blue-100 text-dark text-xs font-medium rounded">
                    {item.glycemicIndex}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${activeTab === "dinner" ? "block" : "hidden"}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dinnerItems.map((item, index) => (
              <div
                key={index}
                className="border border-blue-100 bg-white text-dark rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
              >
                <div className="flex items-center gap-2 pb-2">
                  {item.icon}
                  <h3 className="text-lg font-medium">{item.name}</h3>
                </div>
                <div className="pt-2">
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <div className="inline-block px-2 py-1 bg-blue-100 text-dark text-xs font-medium rounded">
                    {item.glycemicIndex}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

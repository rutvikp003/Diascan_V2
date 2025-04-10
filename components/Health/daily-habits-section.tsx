"use client"

import { useState } from "react"

export function DailyHabitsSection() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    water: false,
    sleep: false,
    meals: false,
    meditation: false,
    medication: false,
    glucose: false,
  })

  const handleCheckChange = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const habits = [
    {
      id: "water",
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
          <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path>
        </svg>
      ),
      label: "Drink 8 glasses of water",
      description: "Stay hydrated throughout the day",
    },
    {
      id: "sleep",
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
          className="h-5 w-5 text-indigo-500"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
      ),
      label: "7-8 hours of sleep",
      description: "Maintain a consistent sleep schedule",
    },
    {
      id: "meals",
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
          className="h-5 w-5 text-amber-500"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
      label: "Regular meal timing",
      description: "Eat meals at consistent times daily",
    },
    {
      id: "meditation",
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
          className="h-5 w-5 text-teal-500"
        >
          <path d="M2 12h20"></path>
          <path d="M12 2v20"></path>
        </svg>
      ),
      label: "10 minutes of meditation",
      description: "Practice mindfulness to reduce stress",
    },
    {
      id: "medication",
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
          className="h-5 w-5 text-red-500"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
      label: "Take medication on time",
      description: "Follow your prescribed medication schedule",
    },
    {
      id: "glucose",
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
          className="h-5 w-5 text-green-500"
        >
          <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path>
        </svg>
      ),
      label: "Check blood glucose",
      description: "Monitor your levels as recommended",
    },
  ]

  const completedCount = Object.values(checkedItems).filter(Boolean).length
  const progressPercentage = (completedCount / habits.length) * 100

  return (
    <section className="py-12 shadow-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">📋 Daily Habits Checklist</h2>
      <p className="text-center text-gray-600 mb-8">Track your daily diabetes management habits</p>

      <div className="border border-teal-100 rounded-lg shadow-sm">
        <div className="p-4 border-b border-teal-100">
          <h3 className="text-xl text-teal-700 flex justify-between items-center">
            <span>Today's Progress</span>
            <span className="text-lg">
              {completedCount}/{habits.length}
            </span>
          </h3>
          <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
            <div className="h-2 bg-teal-500 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {habits.map((habit) => (
              <div key={habit.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                <div className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id={habit.id}
                      type="checkbox"
                      checked={checkedItems[habit.id]}
                      onChange={() => handleCheckChange(habit.id)}
                      className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5">{habit.icon}</div>
                  <div>
                    <label
                      htmlFor={habit.id}
                      className={`font-medium ${
                        checkedItems[habit.id] ? "line-through text-gray-400" : "text-gray-700"
                      }`}
                    >
                      {habit.label}
                    </label>
                    <p className={`text-sm ${checkedItems[habit.id] ? "text-gray-400" : "text-gray-500"}`}>
                      {habit.description}
                    </p>
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

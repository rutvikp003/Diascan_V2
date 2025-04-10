export function ExerciseRoutinesSection() {
  const routines = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-teal-500"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
        </svg>
      ),
      title: "Walking Plan (Beginner)",
      description: "A gentle 20-minute daily walking routine to improve circulation and manage blood sugar levels.",
      benefit: "Improves insulin sensitivity and cardiovascular health",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-teal-500"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
        </svg>
      ),
      title: "Yoga for Diabetes",
      description:
        "Gentle yoga poses designed specifically for people with diabetes to reduce stress and improve flexibility.",
      benefit: "Reduces stress and helps maintain stable blood glucose",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-teal-500"
        >
          <path d="m18 5-3-3H9L6 5"></path>
          <path d="M6 5v14"></path>
          <path d="M18 5v14"></path>
          <path d="M12 12h.01"></path>
        </svg>
      ),
      title: "Light Strength Training",
      description: "Simple resistance exercises using body weight or light dumbbells to build muscle mass.",
      benefit: "Increases metabolism and improves glucose utilization",
    },
  ]

  return (
    <section className="py-12 shadow-xl">
      <h2 className="text-3xl font-bold text-dark dark:text-white mb-8 text-center">🏋️‍♂️ Exercise Routines</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {routines.map((routine, index) => (
          <div
            key={index}
            className="border border-teal-100 rounded-lg shadow-sm hover:shadow-md text-dark bg-white transition-shadow overflow-hidden"
          >
            <div className="flex items-center gap-3 p-4 pb-2">
              <div className="bg-teal-50 p-2 rounded-full">{routine.icon}</div>
              <h3 className="text-lg font-medium">{routine.title}</h3>
            </div>
            <div className="p-4 pt-2">
              <p className="text-gray-600 mb-4">{routine.description}</p>
              <div className="text-sm font-medium text-teal-700 mb-4">
                <span className="font-bold">Benefit:</span> {routine.benefit}
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors">
                Start Routine
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function DisclaimerSection() {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="bg-blue-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-md flex items-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0"
        >
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
          <path d="M12 9v4"></path>
          <path d="M12 17h.01"></path>
        </svg>
        <p>
          The content provided is for educational purposes only and not a substitute for professional medical advice.
          Always consult with your healthcare provider before making changes to your treatment plan.
        </p>
      </div>
    </div>
  )
}

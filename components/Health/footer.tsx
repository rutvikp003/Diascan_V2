import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-teal-600 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold mb-4">Diascan</h3>
            <p className="text-teal-100">Your trusted companion for diabetes management and wellness.</p>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-teal-100 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="#" className="text-teal-100 hover:text-white transition-colors">
                  My Profile
                </Link>
              </li>
              <li>
                <Link href="#" className="text-teal-100 hover:text-white transition-colors">
                  Glucose Tracker
                </Link>
              </li>
              <li>
                <Link href="#" className="text-teal-100 hover:text-white transition-colors">
                  Medication
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-teal-100 hover:text-white transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="#" className="text-teal-100 hover:text-white transition-colors">
                  Recipes
                </Link>
              </li>
              <li>
                <Link href="#" className="text-teal-100 hover:text-white transition-colors">
                  Exercise Videos
                </Link>
              </li>
              <li>
                <Link href="#" className="text-teal-100 hover:text-white transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-teal-100 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-teal-100 hover:text-white transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="#" className="text-teal-100 hover:text-white transition-colors">
                  Feedback
                </Link>
              </li>
              <li>
                <Link href="#" className="text-teal-100 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-teal-500 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-teal-100 text-sm">© 2023 Diascan. All rights reserved.</p>
          <div className="flex items-center mt-4 md:mt-0">
            <span className="text-teal-100 text-sm flex items-center">
              Made with
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
                className="h-4 w-4 mx-1 text-red-400"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
              for better health
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

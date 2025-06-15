# 🩺 Diascan V2 – Smart Diabetes Prediction & Care Platform

**Diascan** is an AI-powered web platform designed to help individuals detect diabetes early, monitor their health, and access essential resources and tools for better diabetic care. Built using **Next.js**, **Tailwind CSS**, and **FastAPI**, it offers intelligent features including diabetes prediction, health tracking, nearby clinic finder, educational resources, and multilingual support.

---

##  Features

###  Diabetes Prediction
- Detect diabetes using manual form inputs or by uploading medical reports (PDF analysis).
- Supports prediction for different types of diabetes (Type 1, Type 2, Gestational).

###  Nearby Hospitals/Clinics
- Uses Google Places API to locate nearby hospitals or clinics based on your location.

###  Smart Dashboard
- Visualize trends in blood sugar, BMI, blood pressure, and previous prediction results.
- Get insights and progress indicators (up/down arrows) to track your health.

###  Save & Manage Detection Results
- Authenticated users can save prediction results to view later.
- Prompts login/signup if unauthenticated users try to save results.

###  User Profile
- Profile picture, basic info, health data, diabetes history.
- Edit personal and health information.
- Change password (for email/password users).

###  Alerts & Reminders *(Coming Soon)*
- Get reminders for check-ups or medication (future integration planned).

###  Health & Wellness Guide
- Step-by-step usage instructions.
- Do’s & Don’ts for diabetes care.
- Educational content with internal and external resources.

###  Multi-language Support *(Planned)*
- Accessible to users in their preferred Indian language.

---

##  Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: FastAPI, Express.js (Authentication), MongoDB
- **Authentication**: JWT-based (Email/Password + Google OAuth)
- **Machine Learning**: Diabetes risk prediction models (Python, integrated with FastAPI)
- **APIs**: Google Places API
- **Database**: MongoDB (Mongoose for user/auth data)

---

##  Installation

###  Prerequisites

- Node.js
- Python 3.9+
- MongoDB

###  Clone & Run

```bash
git clone https://github.com/rutvikp003/Diascan_V2.git
cd Diascan_V2

## FastAPI (Detection API)
cd server/fastapi
pip install -r requirements.txt
uvicorn main:app --reload

## Express.js (Auth API)
cd server/express
npm install
npm start

## Authentication Flow
Sign up with Google or email/password.
Only authenticated users can save detection results.
Auto-fill profile data after sign-up.
Secure with JWT-based auth and hashed passwords (bcrypt).

## Dashboard Highlights
Personalized view of past results.
Visual indicators (trend arrows).
"No data found" message if no records are saved.

## Future Roadmap
 Reminders via email/SMS
 Voice input for form filling
 Language localization (Hindi, Gujarati, etc.)
 PWA for mobile access
 Connect with real doctors

## Contributing
Pull requests are welcome! For major changes, open an issue first to discuss what you’d like to change.

## License
This project is licensed under the MIT License.

## Author
 - Rutvik Parmar
 - rutvikparmar003@gmail.com

github-link:
 - https://github.com/rutvikp003/Diascan_V2.git
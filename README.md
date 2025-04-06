# Diascan

Diascan is a web app that helps diabetic patients detect diabetes early, assess risk levels, and access personalized health tips including diet and exercise plans.

## Features
- Diabetes Detection (form + PDF input)
- Risk Level Assessment (Type & other diseases)
- User Dashboard with Health Tracking
- Nearby Hospitals/Clinics Finder
- Health & Wellness Plans
- Multi-language Support
- Authentication (JWT + Google OAuth)

## Tech Stack
- **Frontend:** Next.js, Tailwind CSS, Redux Toolkit
- **Backend:** FastAPI, Express.js, MongoDB
- **Other Tools:** JWT, Google Maps API, Power BI

## Installation

### Frontend
```bash
cd diascan-frontend
npm install
npm run dev
```

### **Backend**
```bash
cd diascan-backend
pip install -r requirements.txt
uvicorn main:app --reload
```


---

### 🔐 **Environment Variables**
(Optional but useful)

```md
## Environment Variables
- `MONGO_URI` = your MongoDB URI
- `JWT_SECRET` = your secret key
- `GOOGLE_API_KEY` = your Google Maps API key
```

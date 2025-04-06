from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from routes.detection import router as detection_router
from db import db

# CORS settings
origins = [
    "http://localhost:3000",  # Allow requests from your frontend
]

@asynccontextmanager
async def lifespan(app: FastAPI):
    await db.connect()  # Connect to MongoDB on startup
    yield
    await db.disconnect()  # Disconnect from MongoDB on shutdown

app = FastAPI(lifespan=lifespan)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the detection saving API
app.include_router(detection_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "FastAPI for saving detection data is running!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8002, reload=True)

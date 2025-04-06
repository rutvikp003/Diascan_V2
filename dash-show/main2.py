from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router  # Now it should work

app = FastAPI()

# Include routes
app.include_router(router)  # This should now work!
# Allow frontend on localhost:3000
origins = [
    "http://localhost:3000",
    # add more domains here if needed
]
# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8004)

# this is the last data 

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import google.generativeai as genai

# ✅ Gemini configuration
genai.configure(api_key="AIzaSyBoQsCnxICf0keun64246GM0p2dwIR-X3I")
model = genai.GenerativeModel("models/gemini-2.0-flash")

# ✅ Instruction to guide the assistant
instruction = (
    "You are a helpful AI assistant named DiaScan,that ONLY answers questions related to diabetes. "
    "This includes topics like symptoms, prevention, treatment, diet, and lifestyle. "
    "You are also allowed to respond to greetings like 'hello', 'hi', 'how are you', and introduction questions like "
    "'who are you', 'what can you do', and similar small talk.\n\n"
    "If a question is unrelated to diabetes, respond with: "
    "'I'm only able to answer diabetes-related questions. Please ask about diabetes.'"
)

# ✅ FastAPI app
app = FastAPI()

# ✅ Enable CORS (optional, for frontend connection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Request model
class MessageRequest(BaseModel):
    message: str

# ✅ Response model
class MessageResponse(BaseModel):
    response: str

# ✅ Chat endpoint
@app.post("/diabetes_chatbot", response_model=MessageResponse)
async def diabetes_chatbot(req: MessageRequest):
    user_input = req.message

    try:
        full_prompt = f"{instruction}\n\nUser: {user_input}"
        response = model.generate_content(full_prompt)
        return {"response": response.text}
    except Exception as e:
        return {"response": f"An error occurred: {str(e)}"}

if __name__ == "__main__":
    uvicorn.run("diabetes_chatbot:app", host="127.0.0.1", port=8003, reload=True)
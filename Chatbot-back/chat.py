from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os
import json
from dotenv import load_dotenv
from fuzzywuzzy import process

# Load environment variables
dotenv_path = r"C:\Users\Rutvik\Desktop\Diascan_main\Diascan\Chatbot-back\key.env"
load_dotenv(dotenv_path=dotenv_path)

openai.api_key = os.getenv("OPENAI_API_KEY")

# Load predefined responses
def load_predefined_questions(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return json.load(file)
    except Exception as e:
        print(f"Error reading file: {e}")
        return {}

file_path = r"C:\Users\Rutvik\Desktop\Diascan_main\Diascan\Chatbot-back\predefined_questions.json"
predefined_responses = load_predefined_questions(file_path)

# FastAPI app
app = FastAPI()

# Enable CORS to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from any origin (or specify frontend URL)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request model
class ChatRequest(BaseModel):
    message: str

# API route
@app.post("/chat")
async def chat(request: ChatRequest):
    user_input = request.message.strip().lower()

    # Find the closest predefined question
    closest_match, score = process.extractOne(user_input, predefined_responses.keys(), score_cutoff=50)

    if closest_match:
        return {"response": predefined_responses[closest_match]}

    # If no match, call OpenAI API
    messages = [
        {"role": "system", "content": "You are a diabetes assistant."},
        {"role": "user", "content": user_input},
    ]

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=150,
            temperature=0.7
        )
        return {"response": response["choices"][0]["message"]["content"].strip()}

    except Exception as e:
        return {"response": f"Error processing your request: {e}"}

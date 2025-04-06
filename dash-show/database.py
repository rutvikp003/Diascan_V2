from pymongo import MongoClient

# Connect to the MongoDB database
client = MongoClient("mongodb://localhost:27017/")
db = client["Diascan"]  # Ensure this is the correct database name

def get_database():
    client = MongoClient("mongodb://localhost:27017/")
    return client["diascan"]  # Make sure it connects to 'diascan'




# this is the last data 

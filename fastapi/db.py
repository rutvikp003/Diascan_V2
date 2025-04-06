from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI = "mongodb://localhost:27017"
DB_NAME = "diascan"

class Database:
    def __init__(self):
        self.client = None
        self.db = None
        self.detection_collection = None

    async def connect(self):
        self.client = AsyncIOMotorClient(MONGO_URI)
        self.db = self.client[DB_NAME]
        self.detection_collection = self.db["detections"]

    async def disconnect(self):
        self.client.close()

db = Database()
from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Kumara Hotspot API")
api_router = APIRouter(prefix="/api")


# ---------------- Models ----------------
class SubscriptionCreate(BaseModel):
    name: str
    phone: str
    email: EmailStr
    address: str
    city: Optional[str] = ""
    package_id: str
    notes: Optional[str] = ""


class Subscription(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: str
    address: str
    city: Optional[str] = ""
    package_id: str
    notes: Optional[str] = ""
    status: str = "new"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    subject: Optional[str] = "General Inquiry"
    message: str


class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = ""
    subject: Optional[str] = "General Inquiry"
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class CoverageQuery(BaseModel):
    location: str


class CoverageResult(BaseModel):
    location: str
    available: bool
    message_id: str
    message_en: str
    estimated_install_days: Optional[int] = None


# ---------------- Static data ----------------
PACKAGES = [
    {
        "id": "bronze",
        "category": "home",
        "name": "Bronze",
        "speed_mbps": 15,
        "broadband_mbps": 30,
        "price_idr": 150000,
        "popular": False,
        "features_id": [
            "15 Mbps Dedicated",
            "30 Mbps Broadband",
            "Internet Resmi & Berijin",
            "Unlimited tanpa batas",
            "Support 24/7"
        ],
        "features_en": [
            "15 Mbps Dedicated",
            "30 Mbps Broadband",
            "Licensed & Legal ISP",
            "Truly unlimited",
            "24/7 support"
        ]
    },
    {
        "id": "silver",
        "category": "home",
        "name": "Silver",
        "speed_mbps": 18,
        "broadband_mbps": 36,
        "price_idr": 180000,
        "popular": False,
        "features_id": [
            "18 Mbps Dedicated",
            "36 Mbps Broadband",
            "Internet Resmi & Berijin",
            "Unlimited tanpa batas",
            "Support 24/7"
        ],
        "features_en": [
            "18 Mbps Dedicated",
            "36 Mbps Broadband",
            "Licensed & Legal ISP",
            "Truly unlimited",
            "24/7 support"
        ]
    },
    {
        "id": "gold",
        "category": "home",
        "name": "Gold",
        "speed_mbps": 20,
        "broadband_mbps": 40,
        "price_idr": 200000,
        "popular": True,
        "features_id": [
            "20 Mbps Dedicated",
            "40 Mbps Broadband",
            "Internet Resmi & Berijin",
            "Unlimited tanpa batas",
            "Free WiFi router"
        ],
        "features_en": [
            "20 Mbps Dedicated",
            "40 Mbps Broadband",
            "Licensed & Legal ISP",
            "Truly unlimited",
            "Free WiFi router"
        ]
    },
    {
        "id": "new-gold-1",
        "category": "premium",
        "name": "New Gold 1",
        "speed_mbps": 25,
        "broadband_mbps": 50,
        "price_idr": 250000,
        "popular": False,
        "features_id": [
            "25 Mbps Dedicated",
            "50 Mbps Broadband",
            "Internet Resmi & Berijin",
            "Unlimited tanpa batas",
            "Priority support"
        ],
        "features_en": [
            "25 Mbps Dedicated",
            "50 Mbps Broadband",
            "Licensed & Legal ISP",
            "Truly unlimited",
            "Priority support"
        ]
    },
    {
        "id": "new-gold-2",
        "category": "premium",
        "name": "New Gold 2",
        "speed_mbps": 27,
        "broadband_mbps": 54,
        "price_idr": 270000,
        "popular": False,
        "features_id": [
            "27 Mbps Dedicated",
            "54 Mbps Broadband",
            "Internet Resmi & Berijin",
            "Unlimited tanpa batas",
            "Priority support"
        ],
        "features_en": [
            "27 Mbps Dedicated",
            "54 Mbps Broadband",
            "Licensed & Legal ISP",
            "Truly unlimited",
            "Priority support"
        ]
    },
    {
        "id": "platinum-1",
        "category": "premium",
        "name": "Platinum 1",
        "speed_mbps": 30,
        "broadband_mbps": 60,
        "price_idr": 300000,
        "popular": True,
        "features_id": [
            "30 Mbps Dedicated",
            "60 Mbps Broadband",
            "Internet Resmi & Berijin",
            "Unlimited tanpa batas",
            "WiFi 6 router gratis"
        ],
        "features_en": [
            "30 Mbps Dedicated",
            "60 Mbps Broadband",
            "Licensed & Legal ISP",
            "Truly unlimited",
            "Free WiFi 6 router"
        ]
    },
    {
        "id": "platinum-2",
        "category": "premium",
        "name": "Platinum 2",
        "speed_mbps": 35,
        "broadband_mbps": 70,
        "price_idr": 350000,
        "popular": False,
        "features_id": [
            "35 Mbps Dedicated",
            "70 Mbps Broadband",
            "Internet Resmi & Berijin",
            "Unlimited tanpa batas",
            "WiFi 6 router gratis"
        ],
        "features_en": [
            "35 Mbps Dedicated",
            "70 Mbps Broadband",
            "Licensed & Legal ISP",
            "Truly unlimited",
            "Free WiFi 6 router"
        ]
    },
    {
        "id": "platinum-3",
        "category": "premium",
        "name": "Platinum 3",
        "speed_mbps": 40,
        "broadband_mbps": 80,
        "price_idr": 400000,
        "popular": False,
        "features_id": [
            "40 Mbps Dedicated",
            "80 Mbps Broadband",
            "Internet Resmi & Berijin",
            "Unlimited tanpa batas",
            "WiFi 6 router gratis"
        ],
        "features_en": [
            "40 Mbps Dedicated",
            "80 Mbps Broadband",
            "Licensed & Legal ISP",
            "Truly unlimited",
            "Free WiFi 6 router"
        ]
    },
    {
        "id": "business",
        "category": "business",
        "name": "Business",
        "speed_mbps": 50,
        "broadband_mbps": 100,
        "price_idr": 500000,
        "popular": False,
        "features_id": [
            "50 Mbps Dedicated",
            "100 Mbps Broadband",
            "Internet Resmi & Berijin",
            "Dedicated IP publik",
            "SLA 99,95% & onsite engineer"
        ],
        "features_en": [
            "50 Mbps Dedicated",
            "100 Mbps Broadband",
            "Licensed & Legal ISP",
            "Public dedicated IP",
            "99.95% SLA & onsite engineer"
        ]
    }
]

# Mock supported cities (case-insensitive contains match)
SUPPORTED_AREAS = [
    "jakarta", "bandung", "surabaya", "bekasi", "tangerang",
    "bogor", "depok", "semarang", "yogyakarta", "denpasar",
    "medan", "makassar", "cianjur", "demak", "bondowoso"
]


# ---------------- Routes ----------------
@api_router.get("/")
async def root():
    return {"service": "Kumara Hotspot API", "status": "ok"}


@api_router.get("/packages")
async def get_packages():
    return {"packages": PACKAGES}


@api_router.post("/coverage/check", response_model=CoverageResult)
async def check_coverage(query: CoverageQuery):
    loc = query.location.strip().lower()
    if not loc:
        raise HTTPException(status_code=400, detail="Location is required")
    available = any(area in loc for area in SUPPORTED_AREAS)
    if available:
        result = CoverageResult(
            location=query.location,
            available=True,
            message_id=f"Selamat! Area {query.location} sudah tercover layanan Kumara Hotspot.",
            message_en=f"Great! {query.location} is already covered by Kumara Hotspot.",
            estimated_install_days=3
        )
    else:
        result = CoverageResult(
            location=query.location,
            available=False,
            message_id=f"Maaf, area {query.location} belum tercover. Tim kami akan menghubungi Anda untuk opsi ekspansi.",
            message_en=f"Sorry, {query.location} is not yet covered. Our team will reach out about expansion options.",
            estimated_install_days=None
        )
    # log lookup
    await db.coverage_checks.insert_one({
        "id": str(uuid.uuid4()),
        "location": query.location,
        "available": available,
        "created_at": datetime.now(timezone.utc).isoformat()
    })
    return result


@api_router.post("/subscriptions", response_model=Subscription)
async def create_subscription(payload: SubscriptionCreate):
    valid_ids = {p["id"] for p in PACKAGES}
    if payload.package_id not in valid_ids:
        raise HTTPException(status_code=400, detail="Invalid package_id")
    sub = Subscription(**payload.model_dump())
    await db.subscriptions.insert_one(sub.model_dump())
    return sub


@api_router.get("/subscriptions", response_model=List[Subscription])
async def list_subscriptions():
    docs = await db.subscriptions.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return docs


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact(payload: ContactCreate):
    msg = ContactMessage(**payload.model_dump())
    await db.contact_messages.insert_one(msg.model_dump())
    return msg


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contact():
    docs = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return docs


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

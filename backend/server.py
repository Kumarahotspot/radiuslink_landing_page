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
        "id": "home-basic",
        "category": "home",
        "name": "Kumara Home Basic",
        "speed_mbps": 30,
        "price_idr": 199000,
        "popular": False,
        "features_id": [
            "Unlimited kuota",
            "FUP wajar",
            "WiFi router gratis",
            "Garansi 99,5% uptime",
            "Support 24/7"
        ],
        "features_en": [
            "Unlimited quota",
            "Fair usage policy",
            "Free WiFi router",
            "99.5% uptime guarantee",
            "24/7 support"
        ]
    },
    {
        "id": "home-pro",
        "category": "home",
        "name": "Kumara Home Pro",
        "speed_mbps": 100,
        "price_idr": 349000,
        "popular": True,
        "features_id": [
            "Unlimited tanpa FUP",
            "Cocok untuk WFH & streaming 4K",
            "WiFi 6 router gratis",
            "Garansi 99,9% uptime",
            "Priority support 24/7"
        ],
        "features_en": [
            "True unlimited, no FUP",
            "Perfect for WFH & 4K streaming",
            "Free WiFi 6 router",
            "99.9% uptime guarantee",
            "Priority 24/7 support"
        ]
    },
    {
        "id": "business-pro",
        "category": "business",
        "name": "Kumara Business",
        "speed_mbps": 300,
        "price_idr": 899000,
        "popular": False,
        "features_id": [
            "Symmetric upload & download",
            "Dedicated IP publik",
            "SLA 99,95%",
            "Onsite engineer support",
            "Static routing & port forwarding"
        ],
        "features_en": [
            "Symmetric upload & download",
            "Public dedicated IP",
            "99.95% SLA",
            "Onsite engineer support",
            "Static routing & port forwarding"
        ]
    },
    {
        "id": "dedicated-1g",
        "category": "dedicated",
        "name": "Kumara Dedicated 1G",
        "speed_mbps": 1000,
        "price_idr": 3500000,
        "popular": False,
        "features_id": [
            "Full dedicated fiber 1 Gbps",
            "Latency rendah <5ms",
            "SLA 99,99%",
            "Network engineer 24/7",
            "Custom BGP & multi-IP block"
        ],
        "features_en": [
            "Full dedicated 1 Gbps fiber",
            "Low latency <5ms",
            "99.99% SLA",
            "24/7 network engineer",
            "Custom BGP & multi-IP block"
        ]
    }
]

# Mock supported cities (case-insensitive contains match)
SUPPORTED_AREAS = [
    "jakarta", "bandung", "surabaya", "bekasi", "tangerang",
    "bogor", "depok", "semarang", "yogyakarta", "denpasar",
    "medan", "makassar"
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

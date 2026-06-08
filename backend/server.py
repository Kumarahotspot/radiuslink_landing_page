from dotenv import load_dotenv
load_dotenv()

import os
import logging
import uuid
import bcrypt
import jwt
from pathlib import Path
from datetime import datetime, timezone, timedelta
from typing import List, Optional

from fastapi import FastAPI, APIRouter, HTTPException, Request, Depends, Response
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr


ROOT_DIR = Path(__file__).parent

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Kumara Hotspot API")
api_router = APIRouter(prefix="/api")
admin_router = APIRouter(prefix="/api/admin")

JWT_ALGORITHM = "HS256"
JWT_EXPIRES_HOURS = 24


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


class SubscriptionStatusUpdate(BaseModel):
    status: str


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


class PackageBase(BaseModel):
    name: str
    category: str  # home / premium / business
    speed_mbps: int
    broadband_mbps: int
    price_idr: int
    popular: bool = False
    features_id: List[str] = []
    features_en: List[str] = []


class Package(PackageBase):
    id: str
    created_at: Optional[str] = None
    updated_at: Optional[str] = None


class PackageCreate(PackageBase):
    id: Optional[str] = None  # if not provided, auto-slug


class CoverageAreaBase(BaseModel):
    name: str
    slug: str  # lowercase key for matching
    active: bool = True


class CoverageArea(CoverageAreaBase):
    id: str
    created_at: Optional[str] = None


class CoverageAreaCreate(CoverageAreaBase):
    pass


class PromoSettings(BaseModel):
    active: bool = True
    tag_id: str = "Promo Spesial"
    tag_en: str = "Special Offer"
    text_id: str = "Pasang baru hari ini — Gratis biaya instalasi + 1 bulan gratis. Berlaku terbatas!"
    text_en: str = "Sign up today — Free installation + 1 month free. Limited time!"
    cta_id: str = "Klaim Sekarang"
    cta_en: str = "Claim Now"
    cta_message: str = "Halo Kumara, saya tertarik dengan promo pasang baru gratis 1 bulan."


class AdminLogin(BaseModel):
    email: EmailStr
    password: str


class AdminUserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str
    role: str = "admin"  # admin | super_admin


class AdminUserPublic(BaseModel):
    id: str
    email: str
    name: str
    role: str
    created_at: Optional[str] = None


# ---------------- Helpers ----------------
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def create_access_token(user_id: str, email: str, role: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "role": role,
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRES_HOURS),
        "type": "access"
    }
    return jwt.encode(payload, os.environ["JWT_SECRET"], algorithm=JWT_ALGORITHM)


async def get_current_admin(request: Request) -> dict:
    auth = request.headers.get("Authorization", "")
    token = auth[7:] if auth.startswith("Bearer ") else None
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, os.environ["JWT_SECRET"], algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.admin_users.find_one({"id": payload["sub"]})
        if not user:
            raise HTTPException(status_code=401, detail="Admin not found")
        user.pop("_id", None)
        user.pop("password_hash", None)
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


async def require_super_admin(admin: dict = Depends(get_current_admin)) -> dict:
    if admin.get("role") != "super_admin":
        raise HTTPException(status_code=403, detail="Super admin only")
    return admin


def slugify(text: str) -> str:
    s = text.lower().strip()
    out = []
    for ch in s:
        if ch.isalnum():
            out.append(ch)
        elif ch in " -_":
            out.append("-")
    while "--" in "".join(out):
        out = "".join(out).replace("--", "-")
        return out if isinstance(out, str) else "".join(out)
    return "".join(out).strip("-")


# ---------------- Default seed data ----------------
DEFAULT_PACKAGES = [
    {"id": "bronze", "category": "home", "name": "Bronze", "speed_mbps": 15, "broadband_mbps": 30, "price_idr": 150000, "popular": False,
     "features_id": ["15 Mbps Dedicated", "30 Mbps Broadband", "Internet Resmi & Berijin", "Unlimited tanpa batas", "Support 24/7"],
     "features_en": ["15 Mbps Dedicated", "30 Mbps Broadband", "Licensed & Legal ISP", "Truly unlimited", "24/7 support"]},
    {"id": "silver", "category": "home", "name": "Silver", "speed_mbps": 18, "broadband_mbps": 36, "price_idr": 180000, "popular": False,
     "features_id": ["18 Mbps Dedicated", "36 Mbps Broadband", "Internet Resmi & Berijin", "Unlimited tanpa batas", "Support 24/7"],
     "features_en": ["18 Mbps Dedicated", "36 Mbps Broadband", "Licensed & Legal ISP", "Truly unlimited", "24/7 support"]},
    {"id": "gold", "category": "home", "name": "Gold", "speed_mbps": 20, "broadband_mbps": 40, "price_idr": 200000, "popular": True,
     "features_id": ["20 Mbps Dedicated", "40 Mbps Broadband", "Internet Resmi & Berijin", "Unlimited tanpa batas", "Free WiFi router"],
     "features_en": ["20 Mbps Dedicated", "40 Mbps Broadband", "Licensed & Legal ISP", "Truly unlimited", "Free WiFi router"]},
    {"id": "new-gold-1", "category": "premium", "name": "New Gold 1", "speed_mbps": 25, "broadband_mbps": 50, "price_idr": 250000, "popular": False,
     "features_id": ["25 Mbps Dedicated", "50 Mbps Broadband", "Internet Resmi & Berijin", "Unlimited tanpa batas", "Priority support"],
     "features_en": ["25 Mbps Dedicated", "50 Mbps Broadband", "Licensed & Legal ISP", "Truly unlimited", "Priority support"]},
    {"id": "new-gold-2", "category": "premium", "name": "New Gold 2", "speed_mbps": 27, "broadband_mbps": 54, "price_idr": 270000, "popular": False,
     "features_id": ["27 Mbps Dedicated", "54 Mbps Broadband", "Internet Resmi & Berijin", "Unlimited tanpa batas", "Priority support"],
     "features_en": ["27 Mbps Dedicated", "54 Mbps Broadband", "Licensed & Legal ISP", "Truly unlimited", "Priority support"]},
    {"id": "platinum-1", "category": "premium", "name": "Platinum 1", "speed_mbps": 30, "broadband_mbps": 60, "price_idr": 300000, "popular": True,
     "features_id": ["30 Mbps Dedicated", "60 Mbps Broadband", "Internet Resmi & Berijin", "Unlimited tanpa batas", "WiFi 6 router gratis"],
     "features_en": ["30 Mbps Dedicated", "60 Mbps Broadband", "Licensed & Legal ISP", "Truly unlimited", "Free WiFi 6 router"]},
    {"id": "platinum-2", "category": "premium", "name": "Platinum 2", "speed_mbps": 35, "broadband_mbps": 70, "price_idr": 350000, "popular": False,
     "features_id": ["35 Mbps Dedicated", "70 Mbps Broadband", "Internet Resmi & Berijin", "Unlimited tanpa batas", "WiFi 6 router gratis"],
     "features_en": ["35 Mbps Dedicated", "70 Mbps Broadband", "Licensed & Legal ISP", "Truly unlimited", "Free WiFi 6 router"]},
    {"id": "platinum-3", "category": "premium", "name": "Platinum 3", "speed_mbps": 40, "broadband_mbps": 80, "price_idr": 400000, "popular": False,
     "features_id": ["40 Mbps Dedicated", "80 Mbps Broadband", "Internet Resmi & Berijin", "Unlimited tanpa batas", "WiFi 6 router gratis"],
     "features_en": ["40 Mbps Dedicated", "80 Mbps Broadband", "Licensed & Legal ISP", "Truly unlimited", "Free WiFi 6 router"]},
    {"id": "business", "category": "business", "name": "Business", "speed_mbps": 50, "broadband_mbps": 100, "price_idr": 500000, "popular": False,
     "features_id": ["50 Mbps Dedicated", "100 Mbps Broadband", "Internet Resmi & Berijin", "Dedicated IP publik", "SLA 99,95% & onsite engineer"],
     "features_en": ["50 Mbps Dedicated", "100 Mbps Broadband", "Licensed & Legal ISP", "Public dedicated IP", "99.95% SLA & onsite engineer"]},
]

DEFAULT_AREAS = ["jakarta", "bandung", "surabaya", "bekasi", "tangerang", "bogor", "depok",
                 "semarang", "yogyakarta", "denpasar", "medan", "makassar",
                 "cianjur", "demak", "bondowoso"]


# ---------------- Startup ----------------
@app.on_event("startup")
async def startup_event():
    # Indexes
    await db.admin_users.create_index("email", unique=True)
    await db.admin_users.create_index("id", unique=True)
    await db.packages.create_index("id", unique=True)
    await db.coverage_areas.create_index("slug", unique=True)

    # Seed super-admin
    admin_email = os.environ["ADMIN_EMAIL"].lower()
    admin_password = os.environ["ADMIN_PASSWORD"]
    existing = await db.admin_users.find_one({"email": admin_email})
    if existing is None:
        await db.admin_users.insert_one({
            "id": str(uuid.uuid4()),
            "email": admin_email,
            "password_hash": hash_password(admin_password),
            "name": "Super Admin",
            "role": "super_admin",
            "created_at": datetime.now(timezone.utc).isoformat()
        })
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.admin_users.update_one(
            {"email": admin_email},
            {"$set": {"password_hash": hash_password(admin_password)}}
        )

    # Seed packages if empty
    if await db.packages.count_documents({}) == 0:
        now = datetime.now(timezone.utc).isoformat()
        await db.packages.insert_many([{**p, "created_at": now, "updated_at": now} for p in DEFAULT_PACKAGES])

    # Seed coverage areas if empty
    if await db.coverage_areas.count_documents({}) == 0:
        now = datetime.now(timezone.utc).isoformat()
        await db.coverage_areas.insert_many([{
            "id": str(uuid.uuid4()),
            "name": a.title(),
            "slug": a,
            "active": True,
            "created_at": now
        } for a in DEFAULT_AREAS])

    # Seed site settings (promo) if absent
    if await db.site_settings.find_one({"key": "promo"}) is None:
        defaults = PromoSettings().model_dump()
        await db.site_settings.insert_one({"key": "promo", **defaults})


# ---------------- Public Routes ----------------
@api_router.get("/")
async def root():
    return {"service": "Kumara Hotspot API", "status": "ok"}


@api_router.get("/packages")
async def get_packages():
    docs = await db.packages.find({}, {"_id": 0}).to_list(200)
    # Stable order by category then speed
    cat_order = {"home": 0, "premium": 1, "business": 2}
    docs.sort(key=lambda p: (cat_order.get(p.get("category", ""), 99), p.get("speed_mbps", 0)))
    return {"packages": docs}


@api_router.post("/coverage/check", response_model=CoverageResult)
async def check_coverage(query: CoverageQuery):
    loc = query.location.strip()
    if not loc:
        raise HTTPException(status_code=400, detail="Location is required")
    loc_lower = loc.lower()
    areas = await db.coverage_areas.find({"active": True}, {"_id": 0, "slug": 1}).to_list(500)
    available = any(a["slug"] in loc_lower for a in areas)
    if available:
        result = CoverageResult(
            location=loc, available=True,
            message_id=f"Selamat! Area {loc} sudah tercover layanan Kumara Hotspot.",
            message_en=f"Great! {loc} is already covered by Kumara Hotspot.",
            estimated_install_days=3
        )
    else:
        result = CoverageResult(
            location=loc, available=False,
            message_id=f"Maaf, area {loc} belum tercover. Tim kami akan menghubungi Anda untuk opsi ekspansi.",
            message_en=f"Sorry, {loc} is not yet covered. Our team will reach out about expansion options.",
            estimated_install_days=None
        )
    await db.coverage_checks.insert_one({
        "id": str(uuid.uuid4()), "location": loc, "available": available,
        "created_at": datetime.now(timezone.utc).isoformat()
    })
    return result


@api_router.post("/subscriptions", response_model=Subscription)
async def create_subscription(payload: SubscriptionCreate):
    pkg = await db.packages.find_one({"id": payload.package_id})
    if not pkg:
        raise HTTPException(status_code=400, detail="Invalid package_id")
    sub = Subscription(**payload.model_dump())
    await db.subscriptions.insert_one(sub.model_dump())
    return sub


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact(payload: ContactCreate):
    msg = ContactMessage(**payload.model_dump())
    await db.contact_messages.insert_one(msg.model_dump())
    return msg


@api_router.get("/settings/promo")
async def get_promo_settings():
    doc = await db.site_settings.find_one({"key": "promo"}, {"_id": 0, "key": 0})
    if not doc:
        doc = PromoSettings().model_dump()
    return doc


@admin_router.get("/settings/promo")
async def admin_get_promo_settings(_: dict = Depends(get_current_admin)):
    doc = await db.site_settings.find_one({"key": "promo"}, {"_id": 0, "key": 0})
    if not doc:
        doc = PromoSettings().model_dump()
        await db.site_settings.insert_one({"key": "promo", **doc})
    return doc


@admin_router.put("/settings/promo")
async def admin_update_promo_settings(payload: PromoSettings, _: dict = Depends(get_current_admin)):
    update = payload.model_dump()
    await db.site_settings.update_one(
        {"key": "promo"},
        {"$set": update},
        upsert=True
    )
    return update


# ---------------- Admin Auth ----------------
@admin_router.post("/auth/login")
async def admin_login(payload: AdminLogin):
    email = payload.email.lower().strip()
    user = await db.admin_users.find_one({"email": email})
    if not user or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Email atau password salah")
    token = create_access_token(user["id"], user["email"], user["role"])
    return {
        "token": token,
        "user": {"id": user["id"], "email": user["email"], "name": user["name"], "role": user["role"]}
    }


@admin_router.get("/auth/me")
async def admin_me(admin: dict = Depends(get_current_admin)):
    return {"user": {"id": admin["id"], "email": admin["email"], "name": admin["name"], "role": admin["role"]}}


# ---------------- Admin: Packages ----------------
@admin_router.get("/packages")
async def admin_list_packages(_: dict = Depends(get_current_admin)):
    docs = await db.packages.find({}, {"_id": 0}).to_list(500)
    return {"packages": docs}


@admin_router.post("/packages")
async def admin_create_package(payload: PackageCreate, _: dict = Depends(get_current_admin)):
    pid = payload.id or slugify(payload.name)
    if not pid:
        raise HTTPException(status_code=400, detail="Invalid package id/name")
    existing = await db.packages.find_one({"id": pid})
    if existing:
        raise HTTPException(status_code=400, detail="Package id already exists")
    now = datetime.now(timezone.utc).isoformat()
    doc = {**payload.model_dump(exclude={"id"}), "id": pid, "created_at": now, "updated_at": now}
    await db.packages.insert_one(doc)
    doc.pop("_id", None)
    return doc


@admin_router.put("/packages/{pid}")
async def admin_update_package(pid: str, payload: PackageBase, _: dict = Depends(get_current_admin)):
    update = payload.model_dump()
    update["updated_at"] = datetime.now(timezone.utc).isoformat()
    result = await db.packages.update_one({"id": pid}, {"$set": update})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Package not found")
    doc = await db.packages.find_one({"id": pid}, {"_id": 0})
    return doc


@admin_router.delete("/packages/{pid}")
async def admin_delete_package(pid: str, _: dict = Depends(get_current_admin)):
    result = await db.packages.delete_one({"id": pid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Package not found")
    return {"deleted": True}


# ---------------- Admin: Coverage areas ----------------
@admin_router.get("/coverage-areas")
async def admin_list_areas(_: dict = Depends(get_current_admin)):
    docs = await db.coverage_areas.find({}, {"_id": 0}).to_list(500)
    docs.sort(key=lambda x: x.get("name", "").lower())
    return {"areas": docs}


@admin_router.post("/coverage-areas")
async def admin_create_area(payload: CoverageAreaCreate, _: dict = Depends(get_current_admin)):
    slug = payload.slug.lower().strip()
    if not slug:
        raise HTTPException(status_code=400, detail="Invalid slug")
    if await db.coverage_areas.find_one({"slug": slug}):
        raise HTTPException(status_code=400, detail="Area already exists")
    doc = {
        "id": str(uuid.uuid4()),
        "name": payload.name.strip(),
        "slug": slug,
        "active": payload.active,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.coverage_areas.insert_one(doc)
    doc.pop("_id", None)
    return doc


@admin_router.put("/coverage-areas/{aid}")
async def admin_update_area(aid: str, payload: CoverageAreaBase, _: dict = Depends(get_current_admin)):
    result = await db.coverage_areas.update_one(
        {"id": aid},
        {"$set": {"name": payload.name.strip(), "slug": payload.slug.lower().strip(), "active": payload.active}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Area not found")
    return await db.coverage_areas.find_one({"id": aid}, {"_id": 0})


@admin_router.delete("/coverage-areas/{aid}")
async def admin_delete_area(aid: str, _: dict = Depends(get_current_admin)):
    result = await db.coverage_areas.delete_one({"id": aid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Area not found")
    return {"deleted": True}


# ---------------- Admin: Subscriptions / Contacts ----------------
@admin_router.get("/subscriptions")
async def admin_list_subscriptions(_: dict = Depends(get_current_admin)):
    docs = await db.subscriptions.find({}, {"_id": 0}).sort("created_at", -1).to_list(2000)
    return {"subscriptions": docs}


@admin_router.put("/subscriptions/{sid}/status")
async def admin_update_subscription_status(sid: str, payload: SubscriptionStatusUpdate, _: dict = Depends(get_current_admin)):
    result = await db.subscriptions.update_one({"id": sid}, {"$set": {"status": payload.status}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Subscription not found")
    return await db.subscriptions.find_one({"id": sid}, {"_id": 0})


@admin_router.delete("/subscriptions/{sid}")
async def admin_delete_subscription(sid: str, _: dict = Depends(get_current_admin)):
    result = await db.subscriptions.delete_one({"id": sid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Subscription not found")
    return {"deleted": True}


@admin_router.get("/contacts")
async def admin_list_contacts(_: dict = Depends(get_current_admin)):
    docs = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(2000)
    return {"contacts": docs}


@admin_router.delete("/contacts/{cid}")
async def admin_delete_contact(cid: str, _: dict = Depends(get_current_admin)):
    result = await db.contact_messages.delete_one({"id": cid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")
    return {"deleted": True}


# ---------------- Admin: User Management (super_admin only) ----------------
@admin_router.get("/users")
async def admin_list_users(_: dict = Depends(require_super_admin)):
    docs = await db.admin_users.find({}, {"_id": 0, "password_hash": 0}).to_list(500)
    docs.sort(key=lambda x: x.get("created_at", ""))
    return {"users": docs}


@admin_router.post("/users")
async def admin_create_user(payload: AdminUserCreate, _: dict = Depends(require_super_admin)):
    email = payload.email.lower().strip()
    if await db.admin_users.find_one({"email": email}):
        raise HTTPException(status_code=400, detail="Email sudah dipakai")
    if payload.role not in ("admin", "super_admin"):
        raise HTTPException(status_code=400, detail="Role harus 'admin' atau 'super_admin'")
    if len(payload.password) < 6:
        raise HTTPException(status_code=400, detail="Password minimal 6 karakter")
    doc = {
        "id": str(uuid.uuid4()),
        "email": email,
        "password_hash": hash_password(payload.password),
        "name": payload.name.strip(),
        "role": payload.role,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.admin_users.insert_one(doc)
    return {"id": doc["id"], "email": doc["email"], "name": doc["name"], "role": doc["role"], "created_at": doc["created_at"]}


@admin_router.delete("/users/{uid}")
async def admin_delete_user(uid: str, current: dict = Depends(require_super_admin)):
    if uid == current["id"]:
        raise HTTPException(status_code=400, detail="Tidak bisa menghapus akun sendiri")
    target = await db.admin_users.find_one({"id": uid})
    if not target:
        raise HTTPException(status_code=404, detail="Admin not found")
    # Prevent deleting last super_admin
    if target.get("role") == "super_admin":
        super_count = await db.admin_users.count_documents({"role": "super_admin"})
        if super_count <= 1:
            raise HTTPException(status_code=400, detail="Tidak bisa menghapus super-admin terakhir")
    await db.admin_users.delete_one({"id": uid})
    return {"deleted": True}


@admin_router.put("/users/{uid}/password")
async def admin_reset_user_password(uid: str, payload: dict, _: dict = Depends(require_super_admin)):
    new_pw = (payload or {}).get("password", "")
    if len(new_pw) < 6:
        raise HTTPException(status_code=400, detail="Password minimal 6 karakter")
    result = await db.admin_users.update_one({"id": uid}, {"$set": {"password_hash": hash_password(new_pw)}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Admin not found")
    return {"ok": True}


# ---------------- App ----------------
app.include_router(api_router)
app.include_router(admin_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=False,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

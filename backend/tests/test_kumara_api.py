"""Backend tests for Kumara Hotspot ISP landing site."""
import os
import time
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    # fallback to read from frontend/.env so tests still work when run directly
    try:
        with open("/app/frontend/.env") as f:
            for line in f:
                if line.startswith("REACT_APP_BACKEND_URL="):
                    BASE_URL = line.split("=", 1)[1].strip()
                    break
    except Exception:
        pass

BASE_URL = (BASE_URL or "").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------------- Health / Root ----------------
def test_root_ok(client):
    r = client.get(f"{API}/", timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert data.get("status") == "ok"
    assert data.get("service") == "Kumara Hotspot API"


# ---------------- Packages ----------------
def test_packages_returns_four(client):
    r = client.get(f"{API}/packages", timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert "packages" in data
    pkgs = data["packages"]
    assert isinstance(pkgs, list)
    assert len(pkgs) == 4
    ids = {p["id"] for p in pkgs}
    assert ids == {"home-basic", "home-pro", "business-pro", "dedicated-1g"}
    for p in pkgs:
        for key in ("id", "category", "name", "speed_mbps", "price_idr",
                    "popular", "features_id", "features_en"):
            assert key in p, f"missing {key} in {p['id']}"
        assert p["category"] in {"home", "business", "dedicated"}
        assert isinstance(p["features_id"], list) and len(p["features_id"]) > 0
        assert isinstance(p["features_en"], list) and len(p["features_en"]) > 0


# ---------------- Coverage ----------------
def test_coverage_supported(client):
    r = client.post(f"{API}/coverage/check",
                    json={"location": "Jakarta Selatan"}, timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert data["available"] is True
    assert "Jakarta Selatan" in data["message_id"]
    assert "Jakarta Selatan" in data["message_en"]
    assert data["estimated_install_days"] == 3


def test_coverage_unsupported(client):
    r = client.post(f"{API}/coverage/check",
                    json={"location": "Aceh"}, timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert data["available"] is False
    assert "belum" in data["message_id"].lower() or "tidak" in data["message_id"].lower() \
        or "not yet" in data["message_en"].lower()
    assert data["estimated_install_days"] is None


def test_coverage_empty_returns_400(client):
    r = client.post(f"{API}/coverage/check",
                    json={"location": ""}, timeout=15)
    assert r.status_code == 400


# ---------------- Subscriptions ----------------
def test_subscription_create_and_persistence(client):
    suffix = str(int(time.time()))
    payload = {
        "name": f"TEST_User_{suffix}",
        "phone": "08123456789",
        "email": f"test_{suffix}@example.com",
        "address": "Jl. Testing No. 1",
        "city": "Jakarta",
        "package_id": "home-pro",
        "notes": "automated test"
    }
    r = client.post(f"{API}/subscriptions", json=payload, timeout=15)
    assert r.status_code == 200, r.text
    sub = r.json()
    assert "id" in sub and isinstance(sub["id"], str) and len(sub["id"]) > 0
    assert "created_at" in sub
    assert sub["name"] == payload["name"]
    assert sub["email"] == payload["email"]
    assert sub["package_id"] == payload["package_id"]
    assert sub["status"] == "new"

    # Persistence: list and check this id present, most recent first
    r2 = client.get(f"{API}/subscriptions", timeout=15)
    assert r2.status_code == 200
    listed = r2.json()
    assert isinstance(listed, list) and len(listed) >= 1
    ids = [item["id"] for item in listed]
    assert sub["id"] in ids
    # Most recent should be at index 0 (created moments ago)
    assert listed[0]["id"] == sub["id"]


def test_subscription_invalid_package(client):
    payload = {
        "name": "TEST_Invalid",
        "phone": "08123456789",
        "email": "invalid_pkg@example.com",
        "address": "Jl. X",
        "city": "Jakarta",
        "package_id": "non-existent-pkg",
    }
    r = client.post(f"{API}/subscriptions", json=payload, timeout=15)
    assert r.status_code == 400


def test_subscription_missing_required_field(client):
    # Missing 'name'
    payload = {
        "phone": "08123456789",
        "email": "x@example.com",
        "address": "Jl. X",
        "package_id": "home-basic"
    }
    r = client.post(f"{API}/subscriptions", json=payload, timeout=15)
    assert r.status_code == 422


# ---------------- Contact ----------------
def test_contact_create_and_list(client):
    suffix = str(int(time.time()))
    payload = {
        "name": f"TEST_Contact_{suffix}",
        "email": f"contact_{suffix}@example.com",
        "phone": "08123",
        "subject": "Test Subject",
        "message": "Hello from automated test"
    }
    r = client.post(f"{API}/contact", json=payload, timeout=15)
    assert r.status_code == 200, r.text
    msg = r.json()
    assert "id" in msg and len(msg["id"]) > 0
    assert msg["name"] == payload["name"]
    assert msg["email"] == payload["email"]
    assert msg["message"] == payload["message"]

    r2 = client.get(f"{API}/contact", timeout=15)
    assert r2.status_code == 200
    listed = r2.json()
    assert any(item["id"] == msg["id"] for item in listed)


def test_contact_invalid_email(client):
    r = client.post(f"{API}/contact", json={
        "name": "TEST_X",
        "email": "not-an-email",
        "message": "hi"
    }, timeout=15)
    assert r.status_code == 422

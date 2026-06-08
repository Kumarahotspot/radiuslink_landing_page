"""Backend tests for Kumara Hotspot ISP landing site (iteration 2).

Covers:
- Root health
- GET /api/packages (now 9 packages with new IDs)
- POST /api/coverage/check (incl. newly added cities: cianjur, demak, bondowoso)
- POST /api/subscriptions with one of the new package IDs + invalid package_id rejection
- GET /api/subscriptions persistence
- POST /api/contact create + list + invalid email
"""
import os
import time
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
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

EXPECTED_PACKAGE_IDS = {
    "bronze", "silver", "gold",
    "new-gold-1", "new-gold-2",
    "platinum-1", "platinum-2", "platinum-3",
    "business",
}


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
def test_packages_returns_nine_with_new_ids(client):
    r = client.get(f"{API}/packages", timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert "packages" in data
    pkgs = data["packages"]
    assert isinstance(pkgs, list)
    assert len(pkgs) == 9, f"expected 9 packages, got {len(pkgs)}"
    ids = {p["id"] for p in pkgs}
    assert ids == EXPECTED_PACKAGE_IDS, f"mismatch: {ids ^ EXPECTED_PACKAGE_IDS}"
    for p in pkgs:
        for key in ("id", "category", "name", "speed_mbps", "broadband_mbps",
                    "price_idr", "popular", "features_id", "features_en"):
            assert key in p, f"missing {key} in {p['id']}"
        assert p["category"] in {"home", "premium", "business"}
        assert isinstance(p["features_id"], list) and len(p["features_id"]) > 0
        assert isinstance(p["features_en"], list) and len(p["features_en"]) > 0
        assert isinstance(p["speed_mbps"], int) and p["speed_mbps"] > 0
        assert isinstance(p["broadband_mbps"], int) and p["broadband_mbps"] > 0


# ---------------- Coverage ----------------
@pytest.mark.parametrize("loc", ["Jakarta Selatan", "Cianjur", "Demak", "Bondowoso"])
def test_coverage_supported(client, loc):
    r = client.post(f"{API}/coverage/check", json={"location": loc}, timeout=15)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["available"] is True, f"{loc} should be available"
    assert loc in data["message_id"]
    assert loc in data["message_en"]
    assert data["estimated_install_days"] == 3


def test_coverage_unsupported_papua(client):
    r = client.post(f"{API}/coverage/check", json={"location": "Papua"}, timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert data["available"] is False
    assert data["estimated_install_days"] is None


def test_coverage_empty_returns_400(client):
    r = client.post(f"{API}/coverage/check", json={"location": ""}, timeout=15)
    assert r.status_code == 400


# ---------------- Subscriptions ----------------
def test_subscription_create_with_new_package_id_and_persistence(client):
    suffix = str(int(time.time()))
    payload = {
        "name": f"TEST_User_{suffix}",
        "phone": "08123456789",
        "email": f"test_{suffix}@example.com",
        "address": "Jl. Testing No. 1",
        "city": "Jakarta",
        "package_id": "platinum-1",
        "notes": "automated test iteration 2"
    }
    r = client.post(f"{API}/subscriptions", json=payload, timeout=15)
    assert r.status_code == 200, r.text
    sub = r.json()
    assert "id" in sub and isinstance(sub["id"], str) and len(sub["id"]) > 0
    assert "created_at" in sub
    assert sub["name"] == payload["name"]
    assert sub["email"] == payload["email"]
    assert sub["package_id"] == "platinum-1"
    assert sub["status"] == "new"

    # Persistence
    r2 = client.get(f"{API}/subscriptions", timeout=15)
    assert r2.status_code == 200
    listed = r2.json()
    assert isinstance(listed, list) and len(listed) >= 1
    ids = [item["id"] for item in listed]
    assert sub["id"] in ids
    assert listed[0]["id"] == sub["id"]  # most recent first


def test_subscription_invalid_package(client):
    payload = {
        "name": "TEST_Invalid",
        "phone": "08123456789",
        "email": "invalid_pkg@example.com",
        "address": "Jl. X",
        "city": "Jakarta",
        "package_id": "home-pro",  # legacy id, no longer valid
    }
    r = client.post(f"{API}/subscriptions", json=payload, timeout=15)
    assert r.status_code == 400


def test_subscription_invalid_random_package(client):
    payload = {
        "name": "TEST_Invalid2",
        "phone": "08123456789",
        "email": "invalid_pkg2@example.com",
        "address": "Jl. X",
        "city": "Jakarta",
        "package_id": "non-existent-pkg",
    }
    r = client.post(f"{API}/subscriptions", json=payload, timeout=15)
    assert r.status_code == 400


def test_subscription_missing_required_field(client):
    payload = {
        "phone": "08123456789",
        "email": "x@example.com",
        "address": "Jl. X",
        "package_id": "bronze"
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
        "message": "Hello from automated test iteration 2"
    }
    r = client.post(f"{API}/contact", json=payload, timeout=15)
    assert r.status_code == 200, r.text
    msg = r.json()
    assert "id" in msg and len(msg["id"]) > 0
    assert msg["name"] == payload["name"]

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

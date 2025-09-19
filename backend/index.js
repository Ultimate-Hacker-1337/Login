import express from "express";
import cors from "cors";
import fs from "fs";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = "./data.json";
let users = [];

// Load existing users
if (fs.existsSync(DATA_FILE)) {
  users = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

// Reverse geocode with OpenCage
async function reverseGeocode(lat, lng) {
  const key = process.env.OPENCAGE_KEY;
  if (!key) return null;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat},${lng}&key=${key}&no_annotations=1&limit=1`;
  const r = await fetch(url);
  if (!r.ok) return null;
  const data = await r.json();
  return data.results?.[0]?.formatted || null;
}

// Helper to collect IP
function getClientIP(req) {
  let ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
  if (ip === "::1" || ip === "127.0.0.1") ip = "8.8.8.8"; // Mock for localhost
  return ip;
}

// Register endpoint
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, consent, latitude, longitude } = req.body;

    if (!name || !email || !consent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const ip = getClientIP(req);

    let address = null;
    if (latitude && longitude) {
      try {
        address = await reverseGeocode(latitude, longitude);
      } catch (e) {
        console.error("Reverse geocode failed:", e.message);
      }
    }

    const user = {
      name,
      email,
      consent,
      ip,
      coords: latitude && longitude ? { latitude, longitude } : null,
      address,
      date: new Date().toISOString(),
    };

    users.push(user);
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));

    res.json({ message: "Registered", address, location: user.coords });
  } catch (err) {
    console.error("Error registering:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login endpoint
app.post("/api/login", async (req, res) => {
  try {
    const { email, password, consent, latitude, longitude } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    if (!consent) {
      return res.status(400).json({ message: "Consent is required" });
    }

    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const ip = getClientIP(req);

    let address = null;
    if (latitude && longitude) {
      try {
        address = await reverseGeocode(latitude, longitude);
      } catch (e) {
        console.error("Reverse geocode failed:", e.message);
      }
    }

    res.json({
      message: "Login successful",
      address: address || user.address,
      location: { latitude, longitude },
      ip,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// List all users (for testing)
app.get("/api/users", (req, res) => {
  res.json(users);
});

// ✅ Instead of listen, export the app
export default app;
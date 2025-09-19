// // // // import express from "express";
// // // // import fetch from "node-fetch";
// // // // import fs from "fs";
// // // // import path from "path";
// // // // import { fileURLToPath } from "url";

// // // // const __filename = fileURLToPath(import.meta.url);
// // // // const __dirname = path.dirname(__filename);

// // // // const app = express();
// // // // app.use(express.json());
// // // // app.set("trust proxy", true);

// // // // const DATA_FILE = path.join(__dirname, "data.json");
// // // // if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]");

// // // // function saveRecord(record) {
// // // //   const arr = JSON.parse(fs.readFileSync(DATA_FILE, "utf8")) || [];
// // // //   arr.push(record);
// // // //   fs.writeFileSync(DATA_FILE, JSON.stringify(arr, null, 2));
// // // // }

// // // // app.post("/api/register", async (req, res) => {
// // // //   try {
// // // //     const { name, email, consent } = req.body;
// // // //     if (!consent) return res.status(400).json({ message: "Consent required" });

// // // //     const ip =
// // // //       (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "")
// // // //         .split(",")[0]
// // // //         .trim()
// // // //         .replace(/^::ffff:/, "");

// // // //     const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
// // // //     const geo = await geoRes.json().catch(() => ({}));

// // // //     const record = {
// // // //       timestamp: new Date().toISOString(),
// // // //       name,
// // // //       email,
// // // //       ip,
// // // //       location: {
// // // //         city: geo.city || null,
// // // //         region: geo.region || null,
// // // //         country: geo.country_name || geo.country || null,
// // // //       },
// // // //     };

// // // //     saveRecord(record);
// // // //     res.json({
// // // //       ok: true,
// // // //       location: record.location,
// // // //     });
// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     res.status(500).json({ message: "Internal server error" });
// // // //   }
// // // // });

// // // // const PORT = 4000;
// // // // app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));







































// // // import express from "express";
// // // import cors from "cors";
// // // import fs from "fs";
// // // import fetch from "node-fetch";

// // // const app = express();
// // // app.use(cors());
// // // app.use(express.json());

// // // const DB_FILE = "./data.json";

// // // // Helper: load and save users
// // // function loadUsers() {
// // //   try {
// // //     return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
// // //   } catch {
// // //     return [];
// // //   }
// // // }
// // // function saveUsers(users) {
// // //   fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));
// // // }

// // // // POST /api/register
// // // app.post("/api/register", async (req, res) => {
// // //   try {
// // //     const { name, email, consent } = req.body;
// // //     if (!name || !email || !consent) {
// // //       return res.status(400).json({ message: "Missing fields or consent." });
// // //     }

// // //     // Get client IP (works locally + proxies)
// // //     const ip =
// // //       req.headers["x-forwarded-for"]?.split(",")[0] ||
// // //       req.socket.remoteAddress;

// // //     // Default location object
// // //     let location = { city: null, region: null, country: null };

// // //     try {
// // //       // Use free IP API (ipapi.co)
// // //       const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
// // //       if (geoRes.ok) {
// // //         const geoData = await geoRes.json();
// // //         location = {
// // //           city: geoData.city || null,
// // //           region: geoData.region || null,
// // //           country: geoData.country_name || null,
// // //         };
// // //       }
// // //     } catch (err) {
// // //       console.error("Geo lookup failed:", err.message);
// // //     }

// // //     // Save user
// // //     const users = loadUsers();
// // //     users.push({ name, email, consent, ip, location, date: new Date() });
// // //     saveUsers(users);

// // //     res.json({ ok: true, location });
// // //   } catch (err) {
// // //     console.error(err);
// // //     res.status(500).json({ message: "Server error." });
// // //   }
// // // });

// // // // Start server
// // // const PORT = 4000;
// // // app.listen(PORT, () => {
// // //   console.log(`✅ Backend running on http://localhost:${PORT}`);
// // // });





























// // import express from "express";
// // import cors from "cors";
// // import fs from "fs";
// // import fetch from "node-fetch";

// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // const DB_FILE = "./data.json";

// // // Helpers to load/save users
// // function loadUsers() {
// //   try {
// //     return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
// //   } catch {
// //     return [];
// //   }
// // }
// // function saveUsers(users) {
// //   fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));
// // }

// // // POST /api/register
// // app.post("/api/register", async (req, res) => {
// //   try {
// //     const { name, email, consent } = req.body;
// //     if (!name || !email || !consent) {
// //       return res.status(400).json({ message: "Missing fields or consent." });
// //     }

// //     // Get client IP
// //     let ip =
// //       req.headers["x-forwarded-for"]?.split(",")[0] ||
// //       req.socket.remoteAddress;

// //     // Force a fake IP when running locally (so we see real location)
// //     if (ip === "::1" || ip === "127.0.0.1") {
// //       ip = "8.8.8.8"; // Google DNS (will resolve to US)
// //     }

// //     // Default location object
// //     let location = { city: null, region: null, country: null };

// //     try {
// //       // Lookup IP using ipapi.co
// //       const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
// //       if (geoRes.ok) {
// //         const geoData = await geoRes.json();
// //         location = {
// //           city: geoData.city || null,
// //           region: geoData.region || null,
// //           country: geoData.country_name || null,
// //         };
// //       }
// //     } catch (err) {
// //       console.error("Geo lookup failed:", err.message);
// //     }

// //     // Save user
// //     const users = loadUsers();
// //     users.push({ name, email, consent, ip, location, date: new Date() });
// //     saveUsers(users);

// //     res.json({ ok: true, location });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: "Server error." });
// //   }
// // });

// // // Start server
// // const PORT = 4000;
// // app.listen(PORT, () => {
// //   console.log(`✅ Backend running on http://localhost:${PORT}`);
// // });
























// import express from "express";
// import cors from "cors";
// import fs from "fs";
// import fetch from "node-fetch";

// const app = express();
// app.use(cors());
// app.use(express.json());

// const DB_FILE = "./data.json";

// // Helpers to load/save users
// function loadUsers() {
//   try {
//     return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
//   } catch {
//     return [];
//   }
// }
// function saveUsers(users) {
//   fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));
// }

// // POST /api/register
// app.post("/api/register", async (req, res) => {
//   try {
//     const { name, email, consent } = req.body;
//     if (!name || !email || !consent) {
//       return res.status(400).json({ message: "Missing fields or consent." });
//     }

//     // Get client IP
//     let ip =
//       req.headers["x-forwarded-for"]?.split(",")[0] ||
//       req.socket.remoteAddress;

//     // Force a fake IP when running locally
//     if (ip === "::1" || ip === "127.0.0.1") {
//       ip = "8.8.8.8"; // Google DNS (resolves to US)
//     }

//     // Default location
//     let location = { city: "Unknown", region: "Unknown", country: "Unknown" };

//     try {
//       // Lookup IP using ipapi.co
//       const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
//       if (geoRes.ok) {
//         const geoData = await geoRes.json();
//         console.log("🌍 GeoData:", geoData); // DEBUG LOG

//         location = {
//           city: geoData.city || "Unknown",
//           region: geoData.region || "Unknown",
//           country: geoData.country_name || "Unknown",
//         };
//       } else {
//         console.error("Geo API failed:", geoRes.status);
//       }
//     } catch (err) {
//       console.error("Geo lookup failed:", err.message);
//     }

//     // Save user
//     const users = loadUsers();
//     users.push({ name, email, consent, ip, location, date: new Date() });
//     saveUsers(users);

//     res.json({ ok: true, location });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error." });
//   }
// });

// // Start server
// const PORT = 4000;
// app.listen(PORT, () => {
//   console.log(`✅ Backend running on http://localhost:${PORT}`);
// });




















// backend/index.js
import express from "express";
import cors from "cors";
import fs from "fs";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;
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

    // For demo: find user by email
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Optionally: validate password (demo: skip)

    // Collect IP
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

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
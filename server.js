const express = require("express");
const cors = require("cors");
const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.GOOGLE_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/events", async (req, res) => {
  try {
    const { title, description, date, location, category, visibility } = req.body;
    if (!title || !description || !date || !location || !category || !visibility) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const eventData = {
      title,
      description,
      date,
      location,
      category,
      visibility,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    const docRef = await db.collection("events").add(eventData);
    res.status(201).json({ message: "Event created", id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/events", async (req, res) => {
  try {
    const snapshot = await db.collection("events").orderBy("createdAt", "desc").get();
    const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// *** This was missing - get event by ID ***
app.get("/events/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection("events").doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch event" });
  }
});

app.put("/events/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("events").doc(id).update(req.body);
    res.json({ message: "Event updated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update event" });
  }
});

app.delete("/events/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("events").doc(id).delete();
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete event" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

require('dotenv').config();
console.log("Loaded MONGO_URL:", process.env.MONGO_URL);

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// --- Verification Route ---
app.get('/verify', (req, res) => {
  const query = req.query.query; // get ?query= from frontend

  if (!query) {
    return res.json({
      status: "error",
      message: "No query provided"
    });
  }

  // For now, we’ll simulate verification with simple logic
  // Later, you’ll connect to a real database or API
  if (query.toLowerCase().includes("scam")) {
    return res.json({
      status: "scam",
      message: "This entity has been reported as a scam."
    });
  } else if (query.toLowerCase().includes("safe")) {
    return res.json({
      status: "verified",
      message: "This entity is verified and safe."
    });
  } else {
    return res.json({
      status: "unknown",
      message: "No records found. Please be cautious."
    });
  }
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// --- Report Route ---
app.post('/report', (req, res) => {
  const { entity, description } = req.body;

  if (!entity || !description) {
    return res.json({ status: "error", message: "Missing fields" });
  }

  // For now, just simulate saving
  console.log(`Report received: ${entity} - ${description}`);

  return res.json({
    status: "success",
    message: "Scam report submitted successfully!"
  });
});  
const connectDB = require('./config/db');
connectDB();  
const Report = require('./models/Report');

app.post('/report', async (req, res) => {
  const { entity, description } = req.body;

  if (!entity || !description) {
    return res.json({ status: "error", message: "Missing fields" });
  }

  try {
    const newReport = new Report({ entity, description });
    await newReport.save();

    return res.json({
      status: "success",
      message: "Scam report saved successfully!"
    });
  } catch (error) {
    console.error(error);
    return res.json({ status: "error", message: "Failed to save report" });
  }
}); 
console.log("Mongo URL:", process.env.MONGO_URL);
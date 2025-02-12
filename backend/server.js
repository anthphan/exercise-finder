const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());

const EXERCISE_API_URL = "https://exercisedb.p.rapidapi.com/exercises";
const API_KEY = process.env.RAPIDAPI_KEY;

app.get("/api/exercises", async (req, res) => {
  try {
    const response = await axios.get(EXERCISE_API_URL, {
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com", 
      },
    });

    res.json(response.data.slice(0, 10));
  } catch (error) {
    console.error("Error fetching exercises:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: error.response?.data?.message || "Failed to fetch exercises" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

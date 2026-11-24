const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("SmartStudy AI Backend is Running!");
});

// Test route
app.get("/test", (req, res) => {
    res.json({
        message: "SmartStudy AI is working successfully!",
        status: "Success"
    });
});
// AI Doubt Solver Route
app.post("/solve", async (req, res) => {
    const question = req.body.question;

    if (!question || question.trim() === "") {
        return res.status(400).json({
            answer: "Please enter a question."
        });
    }

    try {
        const { GoogleGenAI } = await import("@google/genai");

        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        });

        let response;

for (let attempt = 1; attempt <= 3; attempt++) {
    try {
        response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: `You are a helpful study assistant.
            Explain the following question in simple,
            student-friendly language:

            ${question}`
        });

        break;

    } catch (error) {
        if (error.status === 503 && attempt < 3) {
            console.log(`Gemini busy. Retrying attempt ${attempt + 1}...`);

            await new Promise(resolve =>
                setTimeout(resolve, attempt * 2000)
            );
        } else {
            throw error;
        }
    }
}

        res.json({
            answer: response.text
        });

    } catch (error) {
        console.error("Gemini API Error:", error);

        res.status(500).json({
            answer: "Sorry, I couldn't generate an answer. Please try again."
        });
    }
});
// Start server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
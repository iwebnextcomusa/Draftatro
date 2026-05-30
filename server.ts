import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize the Gemini API client using the API key from environment variables or the fallback key provided
const apiKey = process.env.GEMINI_API_KEY || "AIzaSyCLKX2tohQTHF9Gk06XqqlT-tXUjVSOYBU";
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// AI Chat Endpoint with Draftatron Context
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const systemInstruction = `You are the Draftatron AI assistant, a professional, warm, and helpful representative of Draftatron.
Draftatron is a premier drafting, 3D animated modeling, engineering CAD design, and high-fidelity visualization company based in Waukesha, Wisconsin.

Company Contact Info:
- Phone: 608-215-3761
- Email: ltagnello@gmail.com
- Location: Waukesha, WI
- Target Coverage: Waukesha, Milwaukee County, and Southeastern Wisconsin.

Your Goals:
1. Answer visitor questions about Draftatron's drafting, 3D animatics, rendering, and CAD design services.
2. Provide contact details politely.
3. Help visitors "Get a Quote" by suggesting they use the Contact page or by asking for their name, email, and project type so our team can follow up with them.
4. Keep answers relatively concise, inviting, professional, and clear. Avoid overly technical jargon unless asked.

Be human-like, helpful, and locally proud of serving Wisconsin clients. Ensure all responses are styled in clear, highly scannable Markdown formats when presenting lists or key details.`;

    // Re-create the chat session
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
      history: history || []
    });

    const response = await chat.sendMessage({ message });
    const responseText = response.text || "I apologize, but I am unable to generate a response at the moment. Please feel free to email us directly at ltagnello@gmail.com.";

    // Get updated history
    const updatedHistory = await chat.getHistory();

    res.json({
      text: responseText,
      history: updatedHistory
    });

  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ 
      error: "An error occurred while processing your request.",
      details: error.message 
    });
  }
});

// Start either development or production server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development Mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Started Express server in DEVELOPMENT mode with Vite middleware.");
  } else {
    // Production Mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Started Express server in PRODUCTION mode.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();

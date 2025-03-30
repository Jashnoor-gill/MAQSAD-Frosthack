import express from "express";
import axios from "axios";

const router = express.Router();

// Unified /generate route for text, image, video, and audio generation
router.post("/generate", async (req, res) => {
  const { type, prompt } = req.body;

  try {
    let response;
    
    switch (type) {
      case "text":
        response = await axios.post("https://api.openai.com/v1/completions", {
          model: "gpt-4",
          prompt: prompt,
          max_tokens: 200,
        }, {
          headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
        });
        res.json({ result: response.data.choices[0].text });
        break;

      case "image":
        response = await axios.post("https://api.openai.com/v1/images/generations", {
          prompt: prompt,
          n: 1,
          size: "1024x1024"
        }, {
          headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
        });
        res.json({ result: response.data.data[0].url });
        break;

      case "video":
        // Placeholder for video generation API
        res.json({ result: "Video generation not yet implemented" });
        break;

      case "audio":
        response = await axios.post("https://api.openai.com/v1/audio/speech", {
          input: prompt,
          voice: "alloy",
          model: "tts-1"
        }, {
          headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
          responseType: "arraybuffer"
        });
        res.setHeader("Content-Type", "audio/mpeg");
        res.send(response.data);
        break;

      default:
        res.status(400).json({ error: "Invalid generation type" });
    }
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
});

export default router;

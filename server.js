import express from "express";
import OpenAI from "openai";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/translate", async (req, res) => {
  const { inputText, chosenLanguage } = req.body;
  console.log("Incoming translation request:", inputText, "->", chosenLanguage);

  if (!inputText || !chosenLanguage) {
    console.error("Missing input or language");
    return res.status(400).json({ error: "Missing input or language" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.9,
      messages: [
        { role: "system", content: "You are a multilingual translator specializing in French, Spanish, and German." },
        { role: "user", content: `Translate the following text into ${chosenLanguage}: ${inputText}` }
      ]
    });

    const output = completion.choices[0].message.content;
    console.log("OpenAI response:", output);
    res.json({ output });
  } catch (err) {
    console.error("🔥 Backend translation error:", err);
    res.status(500).json({ error: err.message || "Translation failed" });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import OpenAI from "openai";
import { errorHandler } from "./middleware/errorHandler";
import { registerMoodRoutes } from "./routes/moodRoutes";

dotenv.config();

const app = express();
const port = 3001;

app.use(cors({ origin: "http://localhost:2000" }));
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

registerMoodRoutes(app, openai);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

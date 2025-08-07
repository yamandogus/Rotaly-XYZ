import express from "express";
import cors from "cors";
import { globalLimiter } from "../middleware/rateLimit";

const app = express();

app.use(globalLimiter);

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", //frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

export default app;

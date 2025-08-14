import express from "express";
import cors from "cors";
import { globalLimiter } from "../middleware/rateLimit";

// Route imports
import authRoutes from "../modules/auth/route";
import userRoutes from "../modules/user/route";
import commentRoutes from "../modules/comment/route";
import favoriteRoutes from "../modules/favorites/route";
import emailRoutes from "../modules/email/route";
import messageRoutes from "../modules/message/route";

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

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/messages", messageRoutes);

export default app;

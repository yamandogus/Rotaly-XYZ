import express from "express";
import cors from "cors";
import { globalLimiter } from "../middleware/rateLimit";
import { errorHandler } from "../middleware/errorHandler";

// Route imports
import authRoutes from "../modules/auth/route";
import userRoutes from "../modules/user/route";
import commentRoutes from "../modules/comment/route";
import favoriteRoutes from "../modules/favorites/route";
import emailRoutes from "../modules/email/route";
import messageRoutes from "../modules/message/route";
import supportRoutes from "../modules/support/route";
import adminRoutes from "../modules/admin/route";
import hotelRoutes from "../modules/hotel/route";
import roomRoutes from "../modules/room/route";
import reservationRoutes from "../modules/reservation/route";

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
app.use("/api/support", supportRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/reservations", reservationRoutes);

// error handler has to come after all other routes
app.use(errorHandler);

export default app;

import { createServer } from "http";
import app from "./src/config/app";
import emailRoutes from "./src/modules/email/route";
import userRoutes from "./src/modules/user/route";
import authRoutes from "./src/modules/auth/route";
import { SocketController } from "./src/modules/socket/controller";
import { authLimiter, otpLimiter } from "./src/middleware/rateLimit";

app.use("/api/email", otpLimiter, emailRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authLimiter, authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const server = createServer(app);

const socketController = new SocketController(server);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Socket.IO server initialized`);
  console.log(`Online users: ${socketController.getOnlineUsers()}`);
});

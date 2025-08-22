import { createServer } from "http";
import { SocketController } from "./src/modules/socket/controller";

// creating the server first
const server = createServer();

// initializing socket controller BEFORE importing the app
const socketController = new SocketController(server);

// making socket controller globally available
(global as any).socketController = socketController;

// importing the app (which will initialize routes with access to socketController)
import app from "./src/config/app";

// applying the app to the server
server.on("request", app);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Socket.IO server initialized`);
  console.log(`Online users: ${socketController.getOnlineUsers()}`);
});

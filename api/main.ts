import { createServer } from "http";
import app from "./src/config/app";
import { SocketController } from "./src/modules/socket/controller";

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

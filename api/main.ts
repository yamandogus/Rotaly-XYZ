import app from "./src/config/app";
import { emailRoutes } from "./src/modules/email/route";
/* import userRoutes from "./src/modules/user/route";
 */
// Routes
app.use("/api/email", emailRoutes);
/* app.use("/api/users", userRoutes);
 */
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

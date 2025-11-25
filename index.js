import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import notesRoutes from "./routes/notes.routes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
connectDB();

app.get("/", (req, res) => {
  res.json({ message: "Notes API is running" });
});
app.get("/api/auth/login", (req, res) => {
  res.json({ message: "Login Page" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

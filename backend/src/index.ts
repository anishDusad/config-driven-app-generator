import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import recordRoutes from "./routes/recordRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://buildo-ml690al3h-anish-dusads-projects.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.use("/api/auth", authRoutes);

app.use("/api/records", recordRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
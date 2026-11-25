import express from "express";
import cors from "cors";

export const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "ReachInbox Backend is running!"
  });
});

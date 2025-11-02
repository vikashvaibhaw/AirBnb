import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import listingRouter from "./routes/listing.route.js";
import bookingRouter from "./routes/booking.route.js";

dotenv.config();
let port = process.env.PORT || 6000;

const app = express();
app.use(express.json());
app.use(cookieParser());

// ✅ Allow frontend URL (Render will host both on same domain later)
app.use(cors({
  origin: "*", // you can restrict later if needed
  credentials: true
}));

// 🧩 API Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listing", listingRouter);
app.use("/api/booking", bookingRouter);

// 🧩 Add these lines for serving frontend build:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(port, () => {
  connectDb();
  console.log(`Server started on port ${port}`);
});

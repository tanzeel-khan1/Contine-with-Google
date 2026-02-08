import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import passportRoutes from "./routes/passportRoutes.js";
import "./config/passport.js";
import admissionRoutes from "./routes/admissionRoutes.js";
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use(passport.initialize());

app.use("/auth", passportRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admission", admissionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

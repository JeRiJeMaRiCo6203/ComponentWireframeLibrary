import express, { Router } from "express";
import dotenv from "dotenv";
import cors from "cors";
import appRoute from "./routes/appRoute.js";

const envconfig = dotenv;
const app = express();
const router = Router();

envconfig.config();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", appRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


import express, { Router } from "express";
import dotenv from "dotenv";
import cors from "cors";

const envconfig = dotenv;
const app = express();
const router = Router();

envconfig.config();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/app", require("./routes/appRoute")); 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


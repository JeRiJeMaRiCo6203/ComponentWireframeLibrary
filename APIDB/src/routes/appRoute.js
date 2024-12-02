import express, { Router } from "express";
import {
    getWireframes,
} from "../controllers/wireframesController.js";

const app = express();
const router = Router();

router.route("/").get((request, response) => {
    response.status(201).send({ message: "Hello! API is running..." });
});

router.route("/wireframes").get(getWireframes);

export default router;   
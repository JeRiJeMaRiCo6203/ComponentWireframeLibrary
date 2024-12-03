import express, { Router } from "express";
import {
    getAllWireframesOrByParams,
    getWireframeById
} from "../controllers/wireframesController.js";
import {
    getAllCategoriesOrByParams,
    getCategoryById
} from "../controllers/categoriesController.js";
import {
    getAllEditablesOrByParams,
    getEditableById
} from "../controllers/editablesController.js";

const app = express();
const router = Router();

router.route("/").get((request, response) => {
    response.status(201).send({ message: "Hello! API is running..." });
});

router.route("/wireframes/").get(getAllWireframesOrByParams);
router.route("/wireframes/:id").get(getWireframeById);
router.route("/categories/").get(getAllCategoriesOrByParams);
router.route("/categories/:id").get(getCategoryById);
router.route("/editables/").get(getAllEditablesOrByParams);
router.route("/editables/:id").get(getEditableById);


export default router;   
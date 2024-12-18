import express, { Router } from "express";
import {
  getAllWireframesOrByParams,
  getWireframeById,
  getAllWireframesDetails
} from "../controllers/wireframesController.js";
import {
    getAllCategoriesOrByParams,
    getCategoryById,
    searchCategories
} from "../controllers/categoriesController.js";
import {
  getAllEditablesOrByParams,
  getEditableById,
} from "../controllers/editablesController.js";
import {
  getAllCodeSnippetsOrByParams,
  getCodeSnippetById,
} from "../controllers/codesnippetsController.js";
import {
  getAllWireframesAndCategories,
  getWireframesByCategory,
} from "../controllers/wireframeCategoryController.js";
import { 
    getAllWireframesAndEditables,
    getEditablesByWireframeId
} from "../controllers/wireframeEditableController.js";
import {
  getEditableCodeBasedOnCodeSnippetAndBasedOnCurrentSelectedWireframe
} from "../controllers/editablecodesController.js";

const app = express();
const router = Router();

router.route("/").get((request, response) => {
  response.status(201).send({ message: "Hello! API is running..." });
});

// Wireframes
router.route("/wireframes/").get(getAllWireframesOrByParams);
router.route("/wireframes/:id").get(getWireframeById);
router.route("/wireframesDetails/").get(getAllWireframesDetails);

// Categories
router.route("/categories/").get(getAllCategoriesOrByParams);
router.route("/categories/:id").get(getCategoryById);
router.route("/searchCategories").get(searchCategories);

// Editables
router.route("/editables/").get(getAllEditablesOrByParams);
router.route("/editables/:id").get(getEditableById);

// Code Snippets
router.route("/codesnippets/").get(getAllCodeSnippetsOrByParams);
router.route("/codesnippets/:id").get(getCodeSnippetById);

// Wireframes and Categories
router.route("/wireframesByCategory/").get(getWireframesByCategory);
router.route("/wireframesAndCategories/").get(getAllWireframesAndCategories);

// Wireframes and Editables
router.route("/wireframesAndEditables/").get(getAllWireframesAndEditables);
router.route("/editablesByWireframeId/:id").get(getEditablesByWireframeId);

router.route("/editablecodes/:w_id").get(getEditableCodeBasedOnCodeSnippetAndBasedOnCurrentSelectedWireframe);

export default router;


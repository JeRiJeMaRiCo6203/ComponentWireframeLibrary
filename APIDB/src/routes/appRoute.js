import express, { Router } from "express";

import {
  getAllWireframesOrByParams,
  getWireframeById,
  getAllWireframeDetailsById
} from "../controllers/wireframesController.js";

import {
    getAllCategoriesOrByParams,
    getCategoryById
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
  getAllEditableCodesOrByParams,
  getEditableCodeById,
  getEditableCodeBasedOnCodeSnippetAndBasedOnCurrentSelectedWireframe
} from "../controllers/editablecodesController.js";

import {
  getAllWireframesAndCategories,
  getWireframesByCategory,
  searchWireframesOrCategories,
  getWireframesCategories
} from "../controllers/wireframeCategoryController.js";

import { 
    getAllWireframesAndEditables,
    getEditablesByWireframeId
} from "../controllers/wireframeEditableController.js";


const app = express();
const router = Router();

router.route("/").get((request, response) => {
  response.status(201).send({ message: "Hello! API is running..." });
});

// Wireframes
router.route("/wireframes/").get(getAllWireframesOrByParams);
router.route("/wireframeById/:wireframe_id").get(getWireframeById);
router.route("/wireframeDetails/:wireframe_id").get(getAllWireframeDetailsById);

// Categories
router.route("/categories/").get(getAllCategoriesOrByParams);
router.route("/categoryById/:category_id").get(getCategoryById);

// Editables
router.route("/editables/").get(getAllEditablesOrByParams);
router.route("/editableById/:editable_id").get(getEditableById);

// Code Snippets
router.route("/codesnippets/").get(getAllCodeSnippetsOrByParams);
router.route("/codesnippetById/:codesnippet_id").get(getCodeSnippetById);

// Editable Codes
router.route("/editablecodes/").get(getAllEditableCodesOrByParams);
router.route("/editablecodeById/:editablecode_id").get(getEditableCodeById);
router.route("/editablecodesBasedOnWireframe/:wireframe_id").get(getEditableCodeBasedOnCodeSnippetAndBasedOnCurrentSelectedWireframe);

// Wireframes and Categories
router.route("/wireframesAndCategories/").get(getAllWireframesAndCategories);
router.route("/wireframesByCategory/").get(getWireframesByCategory); //belum selesai
router.route("/searchWireframesOrCategories/").get(searchWireframesOrCategories); //belum selesai
router.route("/wireframesCategories/").get(getWireframesCategories);

// Wireframes and Editables
router.route("/wireframesAndEditables/").get(getAllWireframesAndEditables);
router.route("/editablesByWireframeId/:wireframe_id").get(getEditablesByWireframeId);

export default router;


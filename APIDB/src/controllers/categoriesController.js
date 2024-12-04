import prisma from "../models/prismaClient.js";
import { Prisma } from "@prisma/client";

export const getAllCategoriesOrByParams = async (request, response) => {
  try {
    const { filter, value } = request.query; // Extract query parameters
    console.log(request.query);

    let categoriesQuery = await prisma.categories.findMany();

    if (!filter && !value) return response.send(categoriesQuery);

    // If no filter key is provided but a value is given, search for the value across all fields
    if (value && !filter) {
      categoriesQuery = categoriesQuery.filter((category) =>
        Object.values(category).some((field) =>
          field?.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
    }

    // If both filter and value are provided, filter by the specific field
    else if (filter && value) {
      categoriesQuery = categoriesQuery.filter((category) =>
        category[filter]?.toString().toLowerCase().includes(value.toLowerCase())
      );
    }

    // If no categories are found, return a 404 response
    if (categoriesQuery.length === 0) {
      response.status(404).send({
        msg: "Not found. Category with provided parameter not found.",
      });
      return;
    }

    response.json(categoriesQuery);
  } catch (error) {
    console.error("Error fetching categories:", error);
    response
      .status(500)
      .send({ error: "An error occurred while fetching categories." });
  }
};

export const getCategoryById = async (request, response) => {
  const id = parseInt(request.params.id);

  try {
    if (isNaN(id)) {
      response.status(400).send({ msg: "Bad request. Invalid category id." });
      return;
    }

    const categoriesQuery = await prisma.categories.findUnique({
      where: {
        id: id,
      },
    });

    if (!categoriesQuery) {
      response.status(404).send({ msg: "Not found. Category not found." });
      return;
    }

    response.json(categoriesQuery);
  } catch (error) {
    console.error("Error fetching categories:", error);
    response
      .status(500)
      .send({ error: "An error occurred while fetching categories." });
  }
};

export const searchCategories = async (request, response) => {
  try {
    const { keyword } = request.query;

    if (!keyword || keyword == null || keyword.trim() === "") {
      response.status(200).send({
        msg: "Bad request. Missing required keyword parameter.",
      });
      return;
    }

    // Step 1: Get Suggested Keywords
    const suggestedKeywords = await prisma.$queryRaw(
      Prisma.sql`
      SELECT DISTINCT name AS keyword
      FROM categories
      WHERE name ILIKE ${"%" + keyword + "%"}
    `
    );

    const keywordsArray = suggestedKeywords.map((kw) => kw.keyword);
    console.log(keywordsArray);

    if (keywordsArray.length === 0) {
      response.status(200).send({
        msg: "Not found. No matching categories found for the specified keyword.",
      });
      return;
    }

    // Step 2: Get Wireframes matching the keyword in categories
    const categoriesQuery = await prisma.$queryRaw(
      Prisma.sql`
        SELECT * 
        FROM categories c
        WHERE c.name IN (${Prisma.join(keywordsArray)});
      `
    );

    if (categoriesQuery.length === 0) {
      response.status(404).send({
        msg: "Not found. No categories found for the specified keyword.",
      });
      return;
    }

    // Step 5: Return the results
    response.json({
      //suggestions: suggestedKeywords,
      results: categoriesQuery
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    response.status(500).send({
      error: "An error occurred while searching categories.",
    });
  }
};

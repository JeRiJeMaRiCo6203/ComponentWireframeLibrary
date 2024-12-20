import prisma from "../models/prismaClient.js";
import { Prisma } from "@prisma/client";

export const getAllCategoriesOrByParams = async (request, response) => {
  try {
    const { filter, value } = request.query; // Extract query parameters

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
        msg: "Category with provided parameter not found.",
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
      response.status(404).send({ msg: "Category with provided id not found." });
      return;
    }

    response.json(categoriesQuery);
  } catch (error) {
    console.error("Error fetching categoriy:", error);
    response
      .status(500)
      .send({ error: "An error occurred while fetching category." });
  }
};

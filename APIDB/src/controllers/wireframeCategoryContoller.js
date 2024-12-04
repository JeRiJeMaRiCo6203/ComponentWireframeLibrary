import prisma from "../models/prismaClient.js";
const { Prisma } = require("@prisma/client");

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

// get wireframe (layout) by category (in dan includes)
// contoh endpoint: /wireframesByCategory/?categories=E-Commerce, Blog, Portfolio
export const getWireframesByCategory = async (request, response) => {
  try {
    // Extract the categories from the query parameters
    const { categories } = request.query;

    // If no categories are provided, return all wireframes
    if (!categories) {
      return await prisma.wireframes.findMany();
    }

    // Convert the categories query parameter to an array
    const categoriesArray = categories.split(",").map((cat) => cat.trim());

    // Use IN clause to filter wireframes by categories in SQL query
    const wireframesQuery = await prisma.$queryRaw(
      prisma.sql`
          SELECT
          w.id,
          w.title,
          w.cover,
          array_agg(c.name) AS categories,
          array_agg(e.name) AS editables
          FROM wireframes w
          JOIN category_relationship wc ON w.id = wc.wireframe_id
          JOIN categories c ON wc.category_id = c.id
          JOIN editable_relationship we ON w.id = we.editable_id
          JOIN editables e ON we.editable_id = e.id
          WHERE c.name IN (${Prisma.join(categoriesArray)})
          GROUP BY w.id
          ORDER BY w.id ASC;
        `
    );

    // get all categories related to the wireframes but delete the categories that are being searched by user
    //filter hasil wireframesQuery dengan categoriesArray
    //apabila wireframe.categories includes categoriesArray maka tampilkan hasil
    //sebaliknya tampikan pesan wireframe tidak ditemukan
    //memasukan hasil category dari categoriesQuery ke dalam wireframesQuery
    // Iterasi wireframesQuery untuk mengatur kategori yang tersisa per wireframe
    const filteredwireframesQuery = await Promise.all(
      wireframesQuery.map(async (wireframe) => {
        const remainingCategories = await prisma.$queryRaw(
          prisma.sql`
            SELECT DISTINCT c.name
            FROM wireframes w
            JOIN category_relationship wc ON w.id = wc.wireframe_id
            JOIN categories c on wc.category_id = c.id
            WHERE w.id = ${wireframe.id}
              AND c.name NOT IN (${Prisma.join(categoriesArray)})
            ORDER BY c.name ASC;
          `
        );

        // Set kategori yang tersisa ke wireframe
        wireframe.categories = remainingCategories.map((cat) => cat.name);
        return wireframe;
      })
    );

    // Check if no wireframes match the criteria
    if (wireframesQuery.length === 0 || filteredwireframesQuery.length === 0) {
      return response
        .status(404)
        .send({ message: "No wireframes found for the specified categories." });
    }

    // Return the filtered wireframes
    response.send(filteredwireframesQuery);
  } catch (error) {
    console.error("Error fetching wireframes by category:", error);
    response.status(500).send({
      error: "An error occurred while fetching wireframes by category.",
    });
  }
};

export const getAllWireframesAndCategories = async (request, response) => {
  try {
    const wireframesQuery = await prisma.$queryRaw`
            SELECT 
            w.id, 
            w.title, 
            w.cover, 
            array_agg(c.name) AS categories
            FROM wireframes w
            JOIN category_relationship wc ON w.id = wc.wireframe_id
            JOIN categories c ON wc.category_id = c.id
            GROUP BY w.id
            ORDER BY w.id ASC;
          `;

    response.json(wireframesQuery);
  } catch (error) {
    console.error("Error fetching wireframes:", error);
    response
      .status(500)
      .send({ error: "An error occurred while fetching wireframes." });
  }
};

export const searchWireframesOrCategories = async (request, response) => {};

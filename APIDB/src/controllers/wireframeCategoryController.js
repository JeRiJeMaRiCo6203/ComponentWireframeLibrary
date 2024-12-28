import prisma from "../models/prismaClient.js";
import { Prisma } from "@prisma/client";

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
    console.error("Error fetching wireframes and categories:", error);
    response
      .status(500)
      .send({ error: "An error occurred while fetching wireframes and categories." });
  }
};

export const getWireframesByCategory = async (request, response) => {
  try {
    // Extract the categories from the query parameters
    const { categories } = request.query;

    // If no categories are provided, return all wireframes
    if (!categories) {
      //return await prisma.wireframes.findMany();
      response.status(404).send({
        msg: "Bad request. Missing required categories parameter.",
      });
      return;
    }

    // Convert the categories query parameter to an array
    const categoriesArray = categories.split(",").map((cat) => cat.trim());
    // console.log(categoriesArray);
    const categoryCount = categoriesArray.length;
    // console.log(categoryCount);

    // Use IN clause to filter wireframes by categories in SQL query
    const wireframesQuery = await prisma.$queryRaw(
      Prisma.sql
      `
        WITH matched_wireframes AS (
          SELECT
          w.id,
          COUNT(DISTINCT c.name) AS matched_categories
          FROM wireframes w
          JOIN category_relationship wc ON w.id = wc.wireframe_id
          JOIN categories c ON wc.category_id = c.id
          WHERE c.name IN (${Prisma.join(categoriesArray)}) -- Daftar kategori di sini
          GROUP BY w.id
        )
        SELECT
            w.id,
            w.title,
            w.cover,
            array_agg(DISTINCT c.name) AS categories
        FROM wireframes w
        JOIN category_relationship wc ON w.id = wc.wireframe_id
        JOIN categories c ON wc.category_id = c.id
        WHERE w.id IN (
            SELECT mw.id
            FROM matched_wireframes mw
            WHERE mw.matched_categories = ${categoryCount} -- Jumlah kategori dinamis
        )
        GROUP BY w.id
        ORDER BY w.id ASC;
      `
    );
    // console.log(wireframesQuery)

    // get all categories related to the wireframes but delete the categories that are being searched by user
    //filter hasil wireframesQuery dengan categoriesArray
    //apabila wireframe.categories includes categoriesArray maka tampilkan hasil
    //sebaliknya tampikan pesan wireframe tidak ditemukan
    //memasukan hasil category dari categoriesQuery ke dalam wireframesQuery
    // Iterasi wireframesQuery untuk mengatur kategori yang tersisa per wireframe
    /*
    const filteredwireframesQuery = await Promise.all(
      wireframesQuery.map(async (wireframe) => {
        const remainingCategories = await prisma.$queryRaw(
          Prisma.sql`
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
    */

    // Check if no wireframes match the criteria
    if (wireframesQuery.length === 0) {
      return response
        .status(404)
        .send({ message: "No wireframes found for the specified categories." });
    }

    // Return the filtered wireframes
    // response.send(filteredwireframesQuery);
    response.send(wireframesQuery);
  } catch (error) {
    console.error("Error fetching wireframes by category:", error);
    response.status(500).send({
      error: "An error occurred while fetching wireframes by category.",
    });
  }
};

export const searchWireframesOrCategories = async (request, response) => {
  try {
    const { input } = request.query;

    const wireframesQuery = await prisma.$queryRaw(
            Prisma.sql`
            SELECT 
            w.id, 
            w.title, 
            w.cover,
            array_agg(c.name) AS categories
            FROM wireframes w
            JOIN category_relationship wc ON w.id = wc.wireframe_id
            JOIN categories c ON wc.category_id = c.id
			      WHERE c."name" ILIKE ${"%" + input + "%"} OR w.title ILIKE ${"%" + input + "%"}
            GROUP BY w.id
            ORDER BY w.id ASC;
          `
    );

    response.json(wireframesQuery);    
   
  } catch (error) {
    console.error("Error fetching wireframes by category:", error);
    response.status(500).send({
      error: "An error occurred while fetching wireframes by name or category.",
    });
  }
};

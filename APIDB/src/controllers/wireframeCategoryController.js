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
    response.status(500).send({
      error: "An error occurred while fetching wireframes and categories.",
    });
  }
};
export const getWireframesCategories = async (request, response) => {
  try {
    const { searchKeyword, categoryIds } = request.query;

    // console.log("categoryIds: " + categoryIds);
    // console.log("searchKeyword: " + searchKeyword);

    let wireframesQuery;

    if (!categoryIds && !searchKeyword) {
      // Case 1: No filters applied
      wireframesQuery = await prisma.$queryRaw`
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
    } else if (categoryIds && !searchKeyword) {
      // Case 2: Filter by categoryIds
      const categoryIdsArray = categoryIds
        .split(",")
        .map((id) => parseInt(id.trim()));
      const categoryCount = categoryIdsArray.length;

      wireframesQuery = await prisma.$queryRaw(
        Prisma.sql`
          WITH matched_wireframes AS (
            SELECT
              w.id,
              COUNT(DISTINCT wc.category_id) AS matched_categories
            FROM wireframes w
            JOIN category_relationship wc ON w.id = wc.wireframe_id
            WHERE wc.category_id IN (${Prisma.join(categoryIdsArray)})
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
            WHERE mw.matched_categories = ${categoryCount}
          )
          GROUP BY w.id
          ORDER BY w.id ASC;
        `
      );
    } else if (!categoryIds && searchKeyword) {
      // Case 3: Filter by searchKeyword
      wireframesQuery = await prisma.$queryRaw(
        Prisma.sql`
          WITH filtered_wireframes AS (
            SELECT 
              w.id
            FROM wireframes w
            JOIN category_relationship wc ON w.id = wc.wireframe_id
            JOIN categories c ON wc.category_id = c.id
            WHERE 
              w.title ILIKE ${"%" + searchKeyword + "%"} 
              OR c.name ILIKE ${"%" + searchKeyword + "%"}
          )
          SELECT 
            w.id, 
            w.title, 
            w.cover, 
            array_agg(DISTINCT c.name) AS categories
          FROM wireframes w
          JOIN category_relationship wc ON w.id = wc.wireframe_id
          JOIN categories c ON wc.category_id = c.id
          WHERE w.id IN (SELECT id FROM filtered_wireframes) -- Filter to matching wireframes
          GROUP BY w.id
          ORDER BY 
            CASE 
              WHEN w.title ILIKE ${"%" + searchKeyword + "%"} THEN 1 
              ELSE 2 
            END,
            w.id ASC;
        `
      );
    } else if (categoryIds && searchKeyword) {
      // Case 4: Filter by both categoryIds and searchKeyword
      const categoryIdsArray = categoryIds
        .split(",")
        .map((id) => parseInt(id.trim()));
      wireframesQuery = await prisma.$queryRaw(
        Prisma.sql`
          WITH filtered_wireframes AS (
            SELECT
              w.id
            FROM wireframes w
            JOIN category_relationship wc ON w.id = wc.wireframe_id
            JOIN categories c ON wc.category_id = c.id
            WHERE 
              wc.category_id IN (${Prisma.join(categoryIdsArray)}) 
              AND (w.title ILIKE ${"%" + searchKeyword + "%"} OR c.name ILIKE ${
          "%" + searchKeyword + "%"
        })
          )
          SELECT 
            w.id, 
            w.title, 
            w.cover, 
            array_agg(DISTINCT c.name) AS categories
          FROM wireframes w
          JOIN category_relationship wc ON w.id = wc.wireframe_id
          JOIN categories c ON wc.category_id = c.id
          WHERE w.id IN (SELECT id FROM filtered_wireframes)
          GROUP BY w.id
          ORDER BY w.id ASC;
        `
      );
    }

    // Send the query result
    response.status(200).json(wireframesQuery);
  } catch (error) {
    console.error("Error fetching wireframes and categories:", error);
    response.status(500).send({
      error: "An error occurred while fetching wireframes and categories.",
    });
  }
};

export const getWireframesByCategory = async (request, response) => {
  try {
    // Extract the categories from the query parameters
    const { categoryIds } = request.query;
    const { searchKeyword } = request.query;

    console.log("categoryIds: " + categoryIds);
    console.log("searchKeyword: " + searchKeyword);

    // If no categories are provided, return all wireframes
    if (!categoryIds) {
      //return await prisma.wireframes.findMany();
      response.status(404).send({
        msg: "Bad request. Missing required categories parameter.",
      });
      return;
    }

    // Convert the categories query parameter to an array
    //const categoriesArray = categories.split(",").map((cat) => cat.trim());
    //console.log(categoriesArray);

    const categoryIdsArray = categoryIds
      .split(",")
      .map((id) => parseInt(id.trim()));

    const categoryCount = categoryIdsArray.length;
    // console.log(categoryCount);

    const wireframesQuery = await prisma.$queryRaw(
      Prisma.sql`
      WITH matched_wireframes AS (
          SELECT
            w.id,
            COUNT(DISTINCT wc.category_id) AS matched_categories
          FROM wireframes w
          JOIN category_relationship wc ON w.id = wc.wireframe_id
          WHERE wc.category_id IN (${Prisma.join(
            categoryIdsArray
          )}) -- Filter berdasarkan category_id
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
            WHERE mw.matched_categories = ${categoryCount} -- Jumlah kategori harus cocok
        )
        GROUP BY w.id
        ORDER BY w.id ASC;
      `
    );

    // Use IN clause to filter wireframes by categories in SQL query
    // const wireframesQuery = await prisma.$queryRaw(
    //   Prisma.sql
    //   `
    //     WITH matched_wireframes AS (
    //       SELECT
    //       w.id,
    //       COUNT(DISTINCT c.name) AS matched_categories
    //       FROM wireframes w
    //       JOIN category_relationship wc ON w.id = wc.wireframe_id
    //       JOIN categories c ON wc.category_id = c.id
    //       WHERE c.name IN (${Prisma.join(categoriesArray)}) -- Daftar kategori di sini
    //       GROUP BY w.id
    //     )
    //     SELECT
    //         w.id,
    //         w.title,
    //         w.cover,
    //         array_agg(DISTINCT c.name) AS categories
    //     FROM wireframes w
    //     JOIN category_relationship wc ON w.id = wc.wireframe_id
    //     JOIN categories c ON wc.category_id = c.id
    //     WHERE w.id IN (
    //         SELECT mw.id
    //         FROM matched_wireframes mw
    //         WHERE mw.matched_categories = ${categoryCount} -- Jumlah kategori dinamis
    //     )
    //     GROUP BY w.id
    //     ORDER BY w.id ASC;
    //   `
    // );
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
      // return response
      //   .status(200)
      //   .send({ message: "No wireframes found for the specified categories filter." });
      return response.status(200).send([]);
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
    const { keyword: input, filter: filter } = request.query;

    if (!input) {
      response.status(404).send({
        msg: "Bad request. Missing required keyword parameter.",
      });
      return;
    }

    const categoriesArray = filter
      ? filter.split(",").map((cat) => cat.trim())
      : null;

    // const wireframesQuery = await prisma.$queryRaw(
    //     Prisma.sql`
    //     WITH filtered_wireframes AS (
    //         SELECT
    //             w.id
    //         FROM wireframes w
    //         JOIN category_relationship wc ON w.id = wc.wireframe_id
    //         JOIN categories c ON wc.category_id = c.id
    //         WHERE c.name ILIKE ${"%" + input + "%"} OR w.title ILIKE ${"%" + input + "%"}
    //     )
    //     SELECT
    //         w.id,
    //         w.title,
    //         w.cover,
    //         array_agg(DISTINCT c.name) AS categories
    //     FROM wireframes w
    //     JOIN category_relationship wc ON w.id = wc.wireframe_id
    //     JOIN categories c ON wc.category_id = c.id
    //     WHERE w.id IN (SELECT id FROM filtered_wireframes)
    //     GROUP BY w.id
    //     ORDER BY w.id ASC;
    //   `
    // );

    const wireframesQuery = await prisma.$queryRaw(
      Prisma.sql`
      WITH filtered_wireframes AS (
          SELECT
              w.id
          FROM wireframes w
          JOIN category_relationship wc ON w.id = wc.wireframe_id
          JOIN categories c ON wc.category_id = c.id
          WHERE 
              (${
                categoriesArray
                  ? Prisma.sql`c.name IN (${Prisma.join(categoriesArray)})`
                  : Prisma.sql`TRUE`
              })
              AND (c.name ILIKE ${"%" + input + "%"} OR w.title ILIKE ${
        "%" + input + "%"
      })
      )
      SELECT 
          w.id, 
          w.title, 
          w.cover,
          array_agg(DISTINCT c.name) AS categories
      FROM wireframes w
      JOIN category_relationship wc ON w.id = wc.wireframe_id
      JOIN categories c ON wc.category_id = c.id
      WHERE w.id IN (SELECT id FROM filtered_wireframes)
      GROUP BY w.id
      ORDER BY w.id ASC;
      `
    );

    if (wireframesQuery.length === 0) {
      // return response.status(200).send({ message: "No wireframes or categories found with the specified keyword." });
      return response.status(200).send([]);
    }

    response.json(wireframesQuery);
  } catch (error) {
    console.error("Error fetching wireframes by category:", error);
    response.status(500).send({
      error: "An error occurred while fetching wireframes by name or category.",
    });
  }
};

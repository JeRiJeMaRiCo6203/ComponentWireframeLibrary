import express, { Router } from "express";
import dotenv from "dotenv";
import { Prisma, PrismaClient } from "@prisma/client";
import cors from "cors";
import serverless from "serverless-http";

const prisma = new PrismaClient();
const envconfig = dotenv;
const app = express();
const router = Router();

envconfig.config();

const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());

// localhost:3000 -> base route
// localhost:3000/users -> users route
// localhost:3000/products -> products route
// route, (request handler, response handler)
// API dibangunkan untuk mengakses data dari database
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// base endpoint
app.get("/", (request, response) => {
  response.status(201).send({ message: "Hello! API is running..." });
});

// get all wireframes (layout) and categories
// contoh endpoint: /wireframesAndCategories
app.get("/wireframesAndCategoriesAndEditables/", async (request, response) => {
  try {
    const wireframesQuery = await prisma.$queryRaw`
        SELECT 
        w.id, 
        w.title, 
        w."codestringhtml", 
        w."codestringreact", 
        w."codestringcss", 
        w."codestringlaravel", 
        w.cover, 
        array_agg(c.name) AS categories, 
        array_agg(e.name) AS editables
        FROM wireframes w
        JOIN wireframe_category_editable_relationship wc ON w.id = wc.wireframe_id
        JOIN categories c ON wc.category_id = c.id
        JOIN editables e ON wc.editable_id = e.id
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
});

// get wireframe (layout) by id
// contoh endpoint: /wireframes/1
app.get("/wireframes/:id", async (request, response) => {
  const id = parseInt(request.params.id);

  try {
    if (isNaN(id)) {
      response.status(400).send({ msg: "Bad request. Invalid wireframe id." });
      return;
    }

    const wireframesQuery = await prisma.wireframes.findUnique({
      where: {
        id: id,
      },
    });

    if (!wireframesQuery) {
      response.status(404).send({ msg: "Not found. Wireframe not found." });
      return;
    }

    response.json(wireframesQuery);
  } catch (error) {
    console.error("Error fetching wireframes:", error);
    response
      .status(500)
      .send({ error: "An error occurred while fetching wireframes." });
  }
});

// get all wireframes (layout) or by params
// contoh endpoint: /wireframes?filter=title&value=login
app.get("/wireframes/", async (request, response) => {
  try {
    const { filter, value } = request.query; // Extract query parameters
    console.log(request.query);

    // Fetch all wireframes
    let wireframesQuery = await prisma.wireframes.findMany();

    if (!filter && !value) return response.send(wireframesQuery);

    // If no filter key is provided but a value is given, search for the value across all fields
    if (value && !filter) {
      wireframesQuery = wireframesQuery.filter((wireframe) =>
        Object.values(wireframe).some((field) =>
          field?.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
    }

    // If both filter and value are provided, filter by the specific field
    else if (filter && value) {
      wireframesQuery = wireframesQuery.filter((wireframe) =>
        wireframe[filter]
          ?.toString()
          .toLowerCase()
          .includes(value.toLowerCase())
      );
    }

    // If no wireframes are found, return a 404 response
    if (wireframesQuery.length === 0) {
      response.status(404).send({
        msg: "Not found. Wireframe with provided parameter not found.",
      });
      return;
    }

    // Return the filtered or all wireframes
    response.send(wireframesQuery);
  } catch (error) {
    console.error("Error fetching wireframes:", error);
    response
      .status(500)
      .send({ error: "An error occurred while fetching wireframes." });
  }
});

// get wireframe (layout) by category (in dan includes)
// contoh endpoint: /wireframesByCategory/?categories=E-Commerce, Blog, Portfolio
app.get("/wireframesByCategory", async (request, response) => {
  try {
    // Extract the categories from the query parameters
    const { categories } = request.query;

    // If no categories are provided, return all wireframes
    if (!categories) {
      const wireframesQuery = await prisma.$queryRaw`
        SELECT 
        w.id, 
        w.title, 
        w."codestringhtml", 
        w."codestringreact", 
        w."codestringcss", 
        w."codestringlaravel", 
        w.cover, 
        array_agg(c.name) AS categories,
        array_agg(e.name) AS editables
        FROM wireframes w
        JOIN wireframe_category_editable_relationship wc ON w.id = wc.wireframe_id
        JOIN categories c ON wc.category_id = c.id
        JOIN editables e ON wc.editable_id = e.id
        GROUP BY w.id
        ORDER BY w.id ASC;
      `;
      return response.send(wireframesQuery);
    }

    // Convert the categories query parameter to an array
    const categoriesArray = categories.split(",").map((cat) => cat.trim());
    //console.log(categoriesArray);
    //console.log(Prisma.join(categoriesArray));

    // Use IN clause to filter wireframes by categories in SQL query
    const wireframesQuery = await prisma.$queryRaw(
      Prisma.sql`
        SELECT 
        w.id, 
        w.title, 
        w."codestringhtml", 
        w."codestringreact", 
        w."codestringcss", 
        w."codestringlaravel", 
        w.cover, 
        array_agg(c.name) AS categories,
        array_agg(e.name) AS editables
        FROM wireframes w
        JOIN wireframe_category_editable_relationship wc ON w.id = wc.wireframe_id
        JOIN categories c ON wc.category_id = c.id
        JOIN editables e ON wc.editable_id = e.id
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
          Prisma.sql`
          SELECT DISTINCT c.name
          FROM wireframes w
          JOIN wireframe_category_editable_relationship wc ON w.id = wc.wireframe_id
          JOIN categories c ON wc.category_id = c.id
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
});

// get wireframe (layout) by editables
// contoh endpoint: /wireframesByEditables/?editables=button, form
app.get("/wireframesByEditables", async (request, response) => {
  try {
    // Extract the editables from the query parameters
    const { editables } = request.query;

    // If no editables are provided, return all wireframes
    if (!editables) {
      const wireframesQuery = await prisma.$queryRaw`
        SELECT 
        w.id, 
        w.title, 
        w."codestringhtml", 
        w."codestringreact", 
        w."codestringcss", 
        w."codestringlaravel", 
        w.cover, 
        array_agg(c.name) AS categories,
        array_agg(e.name) AS editables
        FROM wireframes w
        JOIN wireframe_category_editable_relationship wc ON w.id = wc.wireframe_id
        JOIN categories c ON wc.category_id = c.id
        JOIN editables e ON wc.editable_id = e.id
        GROUP BY w.id
        ORDER BY w.id ASC;
      `;
      return response.send(wireframesQuery);
    }

    // Convert the editables query parameter to an array
    const editablesArray = editables.split(",").map((editable) => editable.trim());

    // Use IN clause to filter wireframes by editables in SQL query
    const wireframesQuery = await prisma.$queryRaw(
      Prisma.sql`
        SELECT 
        w.id, 
        w.title, 
        w."codestringhtml", 
        w."codestringreact", 
        w."codestringcss", 
        w."codestringlaravel", 
        w.cover, 
        array_agg(c.name) AS categories,
        array_agg(e.name) AS editables
        FROM wireframes w
        JOIN wireframe_category_editable_relationship wc ON w.id = wc.wireframe_id
        JOIN categories c ON wc.category_id = c.id
        JOIN editables e ON wc.editable_id = e.id
        WHERE e.name IN (${Prisma.join(editablesArray)})
        GROUP BY w.id
        ORDER BY w.id ASC;
      `
    );

    // Get all editables related to the wireframes but exclude the ones being searched by the user
    const filteredWireframesQuery = await Promise.all(
      wireframesQuery.map(async (wireframe) => {
        const remainingEditables = await prisma.$queryRaw(
          Prisma.sql`
          SELECT DISTINCT e.name
          FROM wireframes w
          JOIN wireframe_category_editable_relationship wc ON w.id = wc.wireframe_id
          JOIN editables e ON wc.editable_id = e.id
          WHERE w.id = ${wireframe.id}
            AND e.name NOT IN (${Prisma.join(editablesArray)})
          ORDER BY e.name ASC;
        `
        );

        // Set remaining editables to the wireframe
        wireframe.editables = remainingEditables.map((editable) => editable.name);
        return wireframe;
      })
    );

    // Check if no wireframes match the criteria
    if (wireframesQuery.length === 0 || filteredWireframesQuery.length === 0) {
      return response
        .status(404)
        .send({ message: "No wireframes found for the specified editables." });
    }

    // Return the filtered wireframes
    response.send(filteredWireframesQuery);
  } catch (error) {
    console.error("Error fetching wireframes by editables:", error);
    response.status(500).send({
      error: "An error occurred while fetching wireframes by editables.",
    });
  }
});

// get all categories or by params
// contoh endpoint: /categories?filter=name&value=blog
app.get("/categories/", async (request, response) => {
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
});

// get categories by id
// contoh endpoint: /categories/1
app.get("/categories/:id", async (request, response) => {
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
});

// get all editables or by params
// contoh endpoint: /editables?filter=name&value=button
app.get("/editables/", async (request, response) => {
  try {
    const { filter, value } = request.query; // Extract query parameters
    console.log(request.query);

    let editablesQuery = await prisma.editables.findMany();

    if (!filter && !value) return response.send(editablesQuery);

    // If no filter key is provided but a value is given, search for the value across all fields
    if (value && !filter) {
      editablesQuery = editablesQuery.filter((editable) =>
        Object.values(editable).some((field) =>
          field?.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
    }

    // If both filter and value are provided, filter by the specific field
    else if (filter && value) {
      editablesQuery = editablesQuery.filter((editable) =>
        editable[filter]?.toString().toLowerCase().includes(value.toLowerCase())
      );
    }

    // If no categories are found, return a 404 response
    if (editablesQuery.length === 0) {
      response.status(404).send({
        msg: "Not found. Editable with provided parameter not found.",
      });
      return;
    }

    response.json(editablesQuery);
  } catch (error) {
    console.error("Error fetching editables:", error);
    response
      .status(500)
      .send({ error: "An error occurred while fetching editables." });
  }
});

// get editables by id
// contoh endpoint: /editables/1
app.get("/editables/:id", async (request, response) => {
  const id = parseInt(request.params.id);

  try {
    if (isNaN(id)) {
      response.status(400).send({ msg: "Bad request. Invalid category id." });
      return;
    }

    const editablesQuery = await prisma.editables.findUnique({
      where: {
        id: id,
      },
    });

    if (!editablesQuery) {
      response.status(404).send({ msg: "Not found. Category not found." });
      return;
    }

    response.json(editablesQuery);
  } catch (error) {
    console.error("Error fetching editables:", error);
    response
      .status(500)
      .send({ error: "An error occurred while fetching editables." });
  }
});

// search wireframes by keyword, suggestion with ILIKE and searching with IN
// contoh endpoint: /search?keyword=login
app.get("/searchWireframes/", async (request, response) => {
  try {
    const { keyword } = request.query;
    console.log(keyword);

    if (!keyword || keyword == null || keyword.trim() === "") {
      response.status(200).send({
        msg: "Bad request. Missing required keyword parameter.",
      });
      return;
    }

    // Step 1: Get Suggested Keywords
    const suggestedKeywords = await prisma.$queryRaw(
      Prisma.sql`
      SELECT DISTINCT title AS keyword
      FROM wireframes
      WHERE title ILIKE ${"%" + keyword + "%"}
    `
    );

    const keywordsArray = suggestedKeywords.map((kw) => kw.keyword);
    console.log(keywordsArray);

    if (keywordsArray.length === 0) {
      response.status(200).send({
        msg: "Not found. No wireframes or categories found for the specified keyword.",
      });
      return;
    }

    let searchResults;

    if (keywordsArray.length > 0) {
      searchResults = await prisma.$queryRaw(
        Prisma.sql`
          SELECT 
            w.id, 
            w.title, 
            w."codestringhtml", 
            w."codestringreact", 
            w."codestringcss", 
            w."codestringlaravel", 
            w.cover, 
            array_agg(DISTINCT c.name) AS categories,  -- Aggregate distinct categories
            array_agg(DISTINCT e.name) AS editables   -- Aggregate distinct editables
          FROM wireframes w
          JOIN wireframe_category_editable_relationship wc ON w.id = wc.wireframe_id
          JOIN categories c ON wc.category_id = c.id
          JOIN editables e ON wc.editable_id = e.id
          WHERE w.title ILIKE ANY(ARRAY[${Prisma.join(
            keywordsArray.map((k) => `%${k}%`)
          )}])
          GROUP BY w.id
          ORDER BY w.id ASC;
        `
      );
    }

    if (searchResults.length === 0) {
      response.status(404).send({
        msg: "Not found. No wireframes or categories found for the specified keyword.",
      });
    }

    response.json({ suggestions: suggestedKeywords, results: searchResults });
  } catch (error) {
    console.error("Error fetching wireframes:", error);
    response
      .status(500)
      .send({ error: "An error occurred while searching wireframes." });
  }
});

// search categories by keyword, suggestion with ILIKE and searching with IN
// contoh endpoint: /searchCategories?keyword=blog
app.get("/searchCategories/", async (request, response) => {
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
        msg: "Not found. No wireframes matching categories found for the specified keyword.",
      });
      return;
    }

    // Step 2: Get Wireframes matching the keyword in categories
    const wireframesQuery = await prisma.$queryRaw(
      Prisma.sql`
        SELECT 
          w.id, 
          w.title, 
          w."codestringhtml", 
          w."codestringreact", 
          w."codestringcss", 
          w."codestringlaravel", 
          w.cover,
          array_agg(DISTINCT c.name) AS categories,  -- Aggregate distinct categories
          array_agg(DISTINCT e.name) AS editables    -- Aggregate distinct editables
        FROM wireframes w
        JOIN wireframe_category_editable_relationship wc ON w.id = wc.wireframe_id
        JOIN categories c ON wc.category_id = c.id
        JOIN editables e ON wc.editable_id = e.id
        WHERE c.name IN (${Prisma.join(keywordsArray)})
        GROUP BY w.id
        ORDER BY w.id ASC;
      `
    );

    if (wireframesQuery.length === 0) {
      response.status(404).send({
        msg: "Not found. No wireframes matching categories found for the specified keyword.",
      });
      return;
    }

    // Step 3: Fetch all related categories and editables for the found wireframes
    const wireframeIds = wireframesQuery.map((w) => w.id);

    const allCategoriesAndEditablesQuery = await prisma.$queryRaw(
      Prisma.sql`
        SELECT 
          w.id, 
          array_agg(DISTINCT c.name) AS all_categories,   -- Get all categories for each wireframe
          array_agg(DISTINCT e.name) AS all_editables     -- Get all editables for each wireframe
        FROM wireframes w
        JOIN wireframe_category_editable_relationship wc ON w.id = wc.wireframe_id
        JOIN categories c ON wc.category_id = c.id
        JOIN editables e ON wc.editable_id = e.id
        WHERE w.id IN (${Prisma.join(wireframeIds)})
        GROUP BY w.id;
      `
    );

    // Step 4: Merge the results to include all categories and editables per wireframe
    const wireframesWithAllDetails = wireframesQuery.map((wireframe) => {
      const details = allCategoriesAndEditablesQuery.find((w) => w.id === wireframe.id);
      return {
        ...wireframe,
        categories: details?.all_categories || [],
        editables: details?.all_editables || [],
      };
    });

    // Step 5: Return the results with all categories and editables
    response.json({ suggestions: suggestedKeywords, results: wireframesWithAllDetails });
  } catch (error) {
    console.error("Error fetching wireframes:", error);
    response
      .status(500)
      .send({ error: "An error occurred while searching wireframes by category." });
  }
});

// search editables by keyword, suggestion with ILIKE and searching with IN
// contoh endpoint: /searchEditables?keyword=button
app.get("/searchEditables/", async (request, response) => {
  try {
    const { keyword } = request.query;

    if (!keyword || keyword == null || keyword.trim() === "") {
      response.status(200).send({
        msg: "Bad request. Missing required keyword parameter.",
      });
      return;
    }

    // Step 1: Get Suggested Keywords for Editables
    const suggestedKeywords = await prisma.$queryRaw(
      Prisma.sql`
      SELECT DISTINCT name AS keyword
      FROM editables
      WHERE name ILIKE ${"%" + keyword + "%"}
    `
    );

    const keywordsArray = suggestedKeywords.map((kw) => kw.keyword);
    console.log(keywordsArray);

    if (keywordsArray.length === 0) {
      response.status(200).send({
        msg: "Not found. No wireframes or categories found for the specified keyword.",
      });
      return;
    }

    // Step 2: Get Wireframes matching the keyword in editables
    const wireframesQuery = await prisma.$queryRaw(
      Prisma.sql`
        SELECT 
          w.id, 
          w.title, 
          w."codestringhtml", 
          w."codestringreact", 
          w."codestringcss", 
          w."codestringlaravel", 
          w.cover,
          array_agg(DISTINCT c.name) AS categories,  -- Aggregate distinct categories
          array_agg(DISTINCT e.name) AS editables    -- Aggregate distinct editables
        FROM wireframes w
        JOIN wireframe_category_editable_relationship wc ON w.id = wc.wireframe_id
        JOIN categories c ON wc.category_id = c.id
        JOIN editables e ON wc.editable_id = e.id
        WHERE e.name IN (${Prisma.join(keywordsArray)})
        GROUP BY w.id
        ORDER BY w.id ASC;
      `
    );

    if (wireframesQuery.length === 0) {
      response.status(404).send({
        msg: "Not found. No wireframes or categories found for the specified keyword.",
      });
      return;
    }

    // Step 3: Fetch all related categories and editables for the found wireframes
    const wireframeIds = wireframesQuery.map((w) => w.id);

    const allCategoriesAndEditablesQuery = await prisma.$queryRaw(
      Prisma.sql`
        SELECT 
          w.id, 
          array_agg(DISTINCT c.name) AS all_categories,   -- Get all categories for each wireframe
          array_agg(DISTINCT e.name) AS all_editables     -- Get all editables for each wireframe
        FROM wireframes w
        JOIN wireframe_category_editable_relationship wc ON w.id = wc.wireframe_id
        JOIN categories c ON wc.category_id = c.id
        JOIN editables e ON wc.editable_id = e.id
        WHERE w.id IN (${Prisma.join(wireframeIds)})
        GROUP BY w.id;
      `
    );

    // Step 4: Merge the results to include all categories and editables per wireframe
    const wireframesWithAllDetails = wireframesQuery.map((wireframe) => {
      const details = allCategoriesAndEditablesQuery.find((w) => w.id === wireframe.id);
      return {
        ...wireframe,
        categories: details?.all_categories || [],
        editables: details?.all_editables || [],
      };
    });

    // Step 5: Return the results with all categories and editables
    response.json({ suggestions: suggestedKeywords, results: wireframesWithAllDetails });
  } catch (error) {
    console.error("Error fetching wireframes:", error);
    response
      .status(500)
      .send({ error: "An error occurred while searching wireframes." });
  }
});

// api insert wireframe (layout), category, editable and wireframe_category_editable_relationship
// contoh endpoint: /insert
app.post("/insert/", async (request, response) => {
  const { wireframe, categories, editables } = request.body;

  // Validasi input untuk memastikan wireframe, categories, dan editables ada
  if (!wireframe || !categories || !editables || categories.length === 0 || editables.length === 0) {
    return response.status(400).send({
      error: "Missing required wireframe or categories or editables data.",
    });
  }

  try {
    // Memulai transaksi untuk penyisipan data ke beberapa tabel
    const result = await prisma.$transaction(async (prisma) => {
      // Insert wireframe data
      const newWireframe = await prisma.wireframes.create({
        data: {
          title: wireframe.title,
          codestringhtml: wireframe.codestringhtml,
          codestringreact: wireframe.codestringreact,
          codestringcss: wireframe.codestringcss,
          codestringlaravel: wireframe.codestringlaravel,
          cover: wireframe.cover,
        },
      });

      // Insert multiple categories using a loop
      const newCategories = await Promise.all(
        categories.map(async (category) => {
          return prisma.categories.create({
            data: {
              name: category.name,
            },
          });
        })
      );

      // Insert multiple editables using a loop
      const newEditables = await Promise.all(
        editables.map(async (editable) => {
          return prisma.editables.create({
            data: {
              name: editable.name,
            },
          });
        })
      );

      // Create wireframe-category-editable relationships for each category and editable
      const wireframeCategoryEditableRelationships = [];
      for (const category of newCategories) {
        for (const editable of newEditables) {
          const relationship = await prisma.wireframe_category_editable_relationship.create({
            data: {
              wireframe_id: newWireframe.id,
              category_id: category.id,
              editable_id: editable.id,
            },
          });
          wireframeCategoryEditableRelationships.push(relationship);
        }
      }

      return {
        newWireframe,
        newCategories,
        newEditables,
        wireframeCategoryEditableRelationships,
      };
    });

    response.send({
      wireframe: result.newWireframe,
      categories: result.newCategories,
      editables: result.newEditables,
      wireframeCategoryEditableRelationships: result.wireframeCategoryEditableRelationships,
      message:
        "Wireframe, Categories, Editables, and Wireframe-Category-Editable relationships successfully inserted.",
    });
  } catch (error) {
    response.status(500).send({
      error: "An error occurred during the insert operation",
      details: error.message,
    });
  }
});

// api update wireframe and category by id
// api delete wireframe and category by id

app.use("/api", router);

export const handler = serverless(app);

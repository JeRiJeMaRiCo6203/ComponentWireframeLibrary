import express from "express";
import dotenv from "dotenv";
import { Prisma, PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const envconfig = dotenv;
const app = express();

envconfig.config();

const PORT = process.env.PORT || 3000;
app.use(cors());

// API dibangunkan untuk mengakses data dari database
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
});
// localhost:3000 -> base route
// localhost:3000/users -> users route
// localhost:3000/products -> products route

// route, (request handler, response handler)

/*
app.get('/api/users', (request, response) => {
    response.send([
        { id: 1, username: "john_doe" },
        { id: 2, username: "jane_doe" },
        { id: 3, username: "joe_doe"},
    ]);
});

app.get('/api/products', (request, response) => {
    response.send([
        { id: 1, name: "product 1", price: 12.99 },
        { id: 2, name: "product 2", price: 24.99 },
        { id: 3, name: "product 3", price: 34.99 },
    ]);
});

app.get('/api/creatures', async (request, response) => {
    try {
      const creaturesQuery = await prisma.$queryRaw`
        SELECT c.id, c.title, c.description, array_agg(a.name) AS attributes
        FROM creatures c
        JOIN creature_attributes ca ON c.id = ca.creature_id
        JOIN attributes a ON ca.attribute_id = a.id
        GROUP BY c.id
        ORDER BY c.id ASC;
      `;
  
      response.json(creaturesQuery);
    } catch (error) {
      console.error('Error fetching creatures:', error);
      response.status(500).send({ error: 'An error occurred while fetching creatures.' });
    }
  });
  
app.get('/api/creatures/:param', async (request, response) => {
    const { param } = request.params;
  
    try {
      const creaturesQuery = await prisma.$executeRaw`
        SELECT c.id, c.title, c.description, array_agg(a.name) AS attributes
        FROM creatures c
        JOIN creature_attributes ca ON c.id = ca.creature_id
        JOIN attributes a ON ca.attribute_id = a.id
        WHERE c.title ILIKE ${param}
        GROUP BY c.id;
      `;
  
      response.status(200).json(creaturesQuery);
    } catch (error) {
      console.error('Error fetching creatures:', error);
      response.status(500).send({ error: 'An error occurred while fetching creatures.' });
    }
});
*/

// get all wireframes
/*
app.get('/api/wireframes/', async (request, response) => { 
    try {
      const wireframesQuery = await prisma.wireframes.findMany();
  
      response.json(wireframesQuery);
    } catch (error) {
      console.error('Error fetching wireframes:', error);
      response.status(500).send({ error: 'An error occurred while fetching wireframes.' });
    }
});
*/

// base endpoint
app.get("/", (request, response) => {
  response.status(201).send({ message: "Hello!" });
});

// get all wireframes and categories
app.get("/api/wireframesAndCategories/", async (request, response) => {
  try {
    const wireframesQuery = await prisma.$queryRaw`
        SELECT w.id, w.title, w."codestringHtml", w."codestringReact", w."codestringCSS", w."codestringLaravel", w.cover, array_agg(c.name) AS categories
        FROM wireframes w
        JOIN wireframe_category wc ON w.id = wc.wireframe_id
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
});

// get wireframe by id
app.get("/api/wireframes/:id", async (request, response) => {
  //const { id } = request.params;
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

    // kalau ada mockwireframes dalam bentuk array of object
    /*
    const wireframesQuery = mockwireframes.find((wireframe) => mockwireframe.id === id);
    if(!wireframesQuery) {
      response.status(404).send({ msg: 'Not found. Wireframe not found.' });
      return;
    }
    */

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

// get all wireframes or by params
app.get("/api/wireframes/", async (request, response) => {
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
    //console.log(wireframesQuery, "ii");
    // Return the filtered or all wireframes
    response.send(wireframesQuery);
  } catch (error) {
    console.error("Error fetching wireframes:", error);
    response
      .status(500)
      .send({ error: "An error occurred while fetching wireframes." });
  }
});

// get wireframe by category (in dan includes)
app.get("/api/wireframesByCategory", async (request, response) => {
  try {
    // Extract the categories from the query parameters
    const { categories } = request.query;

    // If no categories are provided, return all wireframes
    if (!categories) {
      const wireframesQuery = await prisma.$queryRaw`
        SELECT w.id, w.title, w."codestringHtml", w."codestringReact", w."codestringCSS", w."codestringLaravel", w.cover, array_agg(c.name) AS categories
        FROM wireframes w
        JOIN wireframe_category wc ON w.id = wc.wireframe_id
        JOIN categories c ON wc.category_id = c.id
        GROUP BY w.id
        ORDER BY w.id ASC;
      `;
      return response.send(wireframesQuery);
    }

    // Convert the categories query parameter to an array
    const categoriesArray = categories.split(",").map((cat) => cat.trim());
    console.log(categoriesArray);
    console.log(Prisma.join(categoriesArray));

    // Use IN clause to filter wireframes by categories in SQL query
    const wireframesQuery = await prisma.$queryRaw(
      Prisma.sql`
        SELECT w.id, w.title, w."codestringHtml", w."codestringReact", w."codestringCSS", w."codestringLaravel", w.cover, array_agg(c.name) AS categories
        FROM wireframes w
        JOIN wireframe_category wc ON w.id = wc.wireframe_id
        JOIN categories c ON wc.category_id = c.id
        WHERE c.name IN (${Prisma.join(categoriesArray)})
        GROUP BY w.id
        ORDER BY w.id ASC;
      `
    );

    // get all categories related to the wireframes but delete the categories that are being searched by user
    const categoriesQuery = await prisma.$queryRaw(
      Prisma.sql`
        SELECT DISTINCT c.name
        FROM wireframes w
        JOIN wireframe_category wc ON w.id = wc.wireframe_id
        JOIN categories c ON wc.category_id = c.id
        WHERE w.id IN (${Prisma.join(
          wireframesQuery.map((wireframe) => wireframe.id)
        )})
          AND c.name NOT IN (${Prisma.join(categoriesArray)})
        ORDER BY c.name ASC;
      `
    );

    console.log(categoriesQuery);

    //console.log(wireframesQuery);

    // apakah perlu logic includes lagi
    // apakah IN sudah bisa mengakomodasi semuanya

    //filter hasil wireframesQuery dengan categoriesArray
    //apabila wireframe.categories includes categoriesArray maka tampilkan hasil
    //sebaliknya tampikan pesan wireframe tidak ditemukan
    //memasukan hasil category dari categoriesQuery ke dalam wireframesQuery
    const filteredwireframesQuery = wireframesQuery
      .filter((wireframe) => {
        return categoriesArray.every((category) =>
          wireframe.categories.includes(category)
        );
      })
      .map((wireframe) => {
        wireframe.categories = [
          ...categoriesQuery.map((category) => category.name),
        ];
        return wireframe;
      });

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

// get all categories or by params
app.get("/api/categories/", async (request, response) => {
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
app.get("/api/categories/:id", async (request, response) => {
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

// search wireframes or categories by keyword, suggestion with ILIKE and searching with IN
app.get("/api/search/", async (request, response) => {
  try {
    const { keyword } = request.query;
    console.log(keyword);

    const suggestedKeywords = await prisma.$queryRaw(
      Prisma.sql`
    SELECT DISTINCT title AS keyword
      FROM wireframes
      WHERE title ILIKE ${"%" + keyword + "%"}
      UNION
      SELECT DISTINCT name AS keyword
      FROM categories
      WHERE name ILIKE ${"%" + keyword + "%"};
    `
    );

    const keywordsArray = suggestedKeywords.map((kw) => kw.keyword);
    console.log(keywordsArray);

    if (keywordsArray.length === 0) {
      response.status(404).send({
        msg: "Not found. No wireframes or categories found for the specified keyword.",
      });
      return;
    }

    let searchResults;

    // search keyword on database with priority on wireframes title then categories name
    if (keywordsArray.length > 0) {
      // Step 2: Perform Search with PRIORITY on title match first, then categories
      searchResults = await prisma.$queryRaw(
        Prisma.sql`
          SELECT w.id, w.title, w."codestringHtml", w."codestringReact", w."codestringCSS", w."codestringLaravel", w.cover, array_agg(c.name) AS categories,
          CASE
            WHEN w.title ILIKE ANY(ARRAY[${Prisma.join(
              keywordsArray.map((k) => `%${k}%`)
            )}]) THEN 1
            ELSE 2
          END AS searchpriority
          FROM wireframes w
          JOIN wireframe_category wc ON w.id = wc.wireframe_id
          JOIN categories c ON wc.category_id = c.id
          WHERE w.title ILIKE ANY(ARRAY[${Prisma.join(
            keywordsArray.map((k) => `%${k}%`)
          )}])
            OR c.name ILIKE ANY(ARRAY[${Prisma.join(
              keywordsArray.map((k) => `%${k}%`)
            )}])
          GROUP BY w.id
          ORDER BY searchpriority ASC, w.id ASC;
        `
      );
    }

    /*
    if (searchResults.length === 0) {
      response.status(404).send({
        msg: "Not found. No wireframes or categories found for the specified keyword.",
      });
    }
  */

    response.json({ suggestions: suggestedKeywords, results: searchResults });
  } catch (error) {
    console.error("Error fetching wireframes:", error);
    response
      .status(500)
      .send({ error: "An error occurred while searching wireframes." });
  }
});
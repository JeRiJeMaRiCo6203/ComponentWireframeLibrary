import prisma from "../models/prismaClient.js";

export const getAllWireframesOrByParams = async (request, response) => {
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
};

export const getWireframeById = async (request, response) => {
  const wireframe_id = parseInt(request.params.wireframe_id);

  try {
    if (isNaN(wireframe_id)) {
      response.status(400).send({ msg: "Bad request. Invalid wireframe id." });
      return;
    }

    const wireframesQuery = await prisma.wireframes.findUnique({
      where: {
        id: wireframe_id,
      },
    });

    if (!wireframesQuery) {
      response
        .status(404)
        .send({ msg: "Wireframe with provided id not found." });
      return;
    }

    response.json(wireframesQuery);
  } catch (error) {
    console.error("Error fetching wireframe:", error);
    response
      .status(500)
      .send({ error: "An error occurred while fetching wireframe." });
  }
};

export const getAllWireframeDetailsById = async (request, response) => {
  const wireframe_id = parseInt(request.params.wireframe_id);

  try {
    if (isNaN(wireframe_id)) {
      response.status(400).send({ msg: "Bad request. Invalid wireframe id." });
      return;
    }

    const wireframeDetailsQuery = await prisma.$queryRaw`
      SELECT 
      w.id,
      w.title,
      w.cover,
      array_agg(DISTINCT c.name) AS categories,
      array_agg(DISTINCT e.name) AS editables,
      (
      SELECT jsonb_agg(jsonb_build_object(
        'name', cs.name,
        'type', cs.type,
        'codesnippet', cs.codesnippet,
        'idx', cs.idx
      ) ORDER BY cs.idx ASC)
      FROM codesnippets cs
      WHERE cs.wireframe_id = w.id
      ) AS codeSnippets
      FROM wireframes w
      LEFT JOIN category_relationship wc ON w.id = wc.wireframe_id
      LEFT JOIN categories c ON wc.category_id = c.id
      LEFT JOIN editable_relationship we ON w.id = we.wireframe_id
      LEFT JOIN editables e ON we.editable_id = e.id
      WHERE w.id = ${wireframe_id}
      GROUP BY w.id
      ORDER BY w.id ASC;
    `;

    if (!wireframeDetailsQuery) {
      response
        .status(404)
        .send({ msg: "Wireframe details with provided id not found." });
      return;
    }

    response.json(wireframeDetailsQuery);
  } catch (error) {
    console.error("Error fetching wireframe details:", error);
    response
      .status(500)
      .send({ error: "An error occurred while fetching wireframe details." });
  }
};

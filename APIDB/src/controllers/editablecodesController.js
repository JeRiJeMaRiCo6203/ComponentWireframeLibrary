import prisma from "../models/prismaClient.js";
import { Prisma } from "@prisma/client";

export const getAllEditableCodesOrByParams = async (request, response) => {
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

export const getEditableCodeBasedOnCodeSnippetAndBasedOnCurrentSelectedWireframe =
  async (request, response) => {
    const wireframe_id = parseInt(request.params.w_id); // Perbaikan variabel yang benar

    try {
      if (isNaN(wireframe_id)) {
        response
          .status(400)
          .send({ msg: "Bad request. Invalid wireframe id." });
        return;
      }

      const codeSnippetAndEditableCodesQuery = await prisma.$queryRaw`
        SELECT 
            w.id,
            cs.id AS codesnippet_id,
            cs.name AS codeSnippetName,
            cs.type AS codeSnippetType,
            cs.codesnippet AS codeSnippet,
            jsonb_agg(jsonb_build_object(
                'idx', ec.idx,
                'editable_idx', ec.editable_idx,
                'type', ec.type,
                'value', ec.value
            )) AS editableCodeSnippet
        FROM wireframes w
        JOIN codesnippets cs ON w.id = cs.wireframe_id
        JOIN editablecodes ec ON cs.id = ec.codesnippet_id
        WHERE w.id = ${wireframe_id}
        GROUP BY w.id, cs.id, cs.name, cs.type, cs.codesnippet;
      `;

      response.status(200).json(codeSnippetAndEditableCodesQuery);
    } catch (error) {
      console.error("Error fetching code snippet:", error);
      response
        .status(500)
        .send({
          error:
            "An error occurred while fetching code snippets and editable codes.",
        });
    }
  };

import prisma from "../models/prismaClient.js";
import { Prisma } from "@prisma/client";

export const getAllEditableCodesOrByParams = async (request, response) => {
  try {
    const { filter, value } = request.query; // Extract query parameters
    console.log(request.query);

    // Fetch all editable codes
    let editableCodesQuery = await prisma.editablecodes.findMany();

    if (!filter && !value) return response.send(editableCodesQuery);

    // If no filter key is provided but a value is given, search for the value across all fields
    if (value && !filter) {
      editableCodesQuery = editableCodesQuery.filter((editablecode) =>
        Object.values(editablecode).some((field) =>
          field?.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
    }

    // If both filter and value are provided, filter by the specific field
    else if (filter && value) {
      editableCodesQuery = editableCodesQuery.filter((editablecode) =>
        editablecode[filter]
          ?.toString()
          .toLowerCase()
          .includes(value.toLowerCase())
      );
    }

    if (editableCodesQuery.length === 0) {
      response.status(404).send({
        msg: "Editable Code with provided parameter not found.",
      });
      return;
    }

    response.send(editableCodesQuery);
  } catch (error) {
    console.error("Error fetching editable codes:", error);
    response
      .status(500)
      .send({ error: "An error occurred while fetching editable codes." });
  }
};

export const getEditableCodeById = async (request, response) => {
  const editableCode_id = parseInt(request.params.editablecode_id);

  try {
    if (isNaN(editableCode_id)) {
      response
        .status(400)
        .send({ msg: "Bad request. Invalid editableCode id." });
      return;
    }

    const editableCodeQuery = await prisma.editablecodes.findUnique({
      where: {
        id: editableCode_id,
      },
    });

    if (!editableCodeQuery) {
      response
        .status(404)
        .send({ msg: "Editable Code with provided id not found." });
      return;
    }

    response.json(editableCodeQuery);
  } catch (error) {
    console.error("Error fetching editable code:", error);
    response
      .status(500)
      .send({ error: "An error occurred while fetching editable code." });
  }
};

export const getEditableCodeBasedOnCodeSnippetAndBasedOnCurrentSelectedWireframe =
  async (request, response) => {
    const wireframe_id = parseInt(request.params.wireframe_id); // Perbaikan variabel yang benar

    try {
      if (isNaN(wireframe_id)) {
        response
          .status(400)
          .send({ msg: "Bad request. Invalid wireframe id." });
        return;
      }

      const codeSnippetAndEditableCodesQuery = await prisma.$queryRaw`
      SELECT 
          w.id AS wireframe_id,
          cs.id AS codesnippet_id,
          cs.name AS codeSnippet_Name,
          cs.type AS codeSnippet_Type,
          cs.codesnippet AS codeSnippet,
          cs.idx AS idx,
          COALESCE(
            jsonb_agg(
              jsonb_build_object(
                'idx', ec.idx,
                'editable_idx', ec.editable_idx,
                'type', ec.type,
                'value', ec.value
              )
            ) FILTER (WHERE ec.id IS NOT NULL),
            '[]'::jsonb
          ) AS editable_CodeSnippet
      FROM wireframes w
      JOIN codesnippets cs ON w.id = cs.wireframe_id
      LEFT JOIN editablecodes ec ON cs.id = ec.codesnippet_id
      WHERE w.id = ${wireframe_id}
      GROUP BY w.id, cs.id, cs.name, cs.type, cs.codesnippet, cs.idx
      ORDER BY cs.idx ASC;
    `;

      response.status(200).json(codeSnippetAndEditableCodesQuery);
    } catch (error) {
      console.error("Error fetching code snippet and editable codes:", error);
      response.status(500).send({
        error:
          "An error occurred while fetching code snippets and editable codes.",
      });
    }
  };

import prisma from "../models/prismaClient.js";
import { Prisma } from "@prisma/client";

export const getEditableCodeBasedOnCodeSnippetAndBasedOnCurrentSelectedWireframe = async (request, response) => {
    const wireframe_id = parseInt(request.params.w_id); // Perbaikan variabel yang benar
  
    try {
      if (isNaN(wireframe_id)) {
        response.status(400).send({ msg: "Bad request. Invalid wireframe id." });
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
                'value', ec.value
            )) AS editableCodeSnippet
        FROM wireframes w
        JOIN codesnippets cs ON w.id = cs.wireframe_id
        JOIN editablecodes ec ON cs.id = ec.codesnippet_id
        WHERE w.id = ${wireframe_id} -- Menggunakan parameter Prisma
        GROUP BY w.id, cs.id, cs.name, cs.type, cs.codesnippet;
      `;
  
      response.status(200).json(codeSnippetAndEditableCodesQuery);
    } catch (error) {
      console.error("Error fetching code snippet:", error);
      response
        .status(500)
        .send({ error: "An error occurred while fetching code snippet." });
    }
  };
  
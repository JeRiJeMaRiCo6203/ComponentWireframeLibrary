import prisma from "../models/prismaClient.js";

export const getAllWireframesAndEditables = async (request, response) => {
  try {
    const wireframesQuery = await prisma.$queryRaw`
            SELECT 
            w.id, 
            w.title, 
            w.cover, 
            array_agg(e.name) AS editables
            FROM wireframes w
            JOIN  editable_relationship we ON w.id = we.wireframe_id
            JOIN editables e ON we.editable_id = e.id
            GROUP BY w.id
            ORDER BY w.id ASC;
            `;

    response.json(wireframesQuery);
  } catch (error) {
    console.error("Error fetching wireframes and editables:", error);
    response
      .status(500)
      .send({ error: "An error occurred while fetching wireframes and editables." });
  }
};

export const getEditablesByWireframeId = async (request, response) => {
  try {
    const id = parseInt(request.params.id);

    if (isNaN(id)) {
      response.status(400).send({ msg: "Bad request. Invalid wireframe id." });
      return;
    }

    let editablesByWireframeIdQuery = await prisma.$queryRaw
    `
    SELECT
    e.id AS editable_id,
    e.idx AS idx,
    e.name AS editable_name,
    e.dropdown_options AS dropdown_options,
    e.switch_options AS switch_options,
    e.number_range AS number_range,
    e.remove_property AS remove_property
    FROM editable_relationship we
    JOIN editables e ON we.editable_id = e.id
    WHERE we.wireframe_id = ${id}
    ORDER BY e.idx ASC;
    `

    const removeEmptyFields = (editable) => {
      return Object.fromEntries(
        Object.entries(editable).filter(
          ([_, fieldValue]) =>
            fieldValue !== null && // Remove null values
            !(Array.isArray(fieldValue) && fieldValue.length === 0) // Remove empty arrays
        )
      );
    };

    editablesByWireframeIdQuery = editablesByWireframeIdQuery.map(removeEmptyFields);

    response.json(editablesByWireframeIdQuery);
    
  } catch (error) {
    console.error("Error fetching wireframe and editables:", error);
    response
      .status(500)
      .send({ error: "An error occurred while fetching wireframe and editables." });
  }
};

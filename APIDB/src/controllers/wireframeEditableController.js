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
    console.error("Error fetching wireframes:", error);
    response
      .status(500)
      .send({ error: "An error occurred while fetching wireframes." });
  }
};

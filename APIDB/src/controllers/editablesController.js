import prisma from "../models/prismaClient.js";

export const getAllEditablesOrByParams = async (request, response) => {
  try {
    const { filter, value } = request.query; // Extract query parameters

    // Fetch all editables from the database
    let editablesQuery = await prisma.editables.findMany();

    // Helper function to remove fields with empty arrays or null values
    const removeEmptyFields = (editable) => {
      return Object.fromEntries(
        Object.entries(editable).filter(
          ([_, fieldValue]) =>
            fieldValue !== null && // Remove null values
            !(Array.isArray(fieldValue) && fieldValue.length === 0) // Remove empty arrays
        )
      );
    };

    // Apply filtering logic
    if (!filter && !value) {
      // Remove empty fields from all results
      editablesQuery = editablesQuery.map(removeEmptyFields);
      return response.send(editablesQuery);
    }

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

    // Remove empty fields from filtered results
    editablesQuery = editablesQuery.map(removeEmptyFields);

    // If no results are found, return a 404 response
    if (editablesQuery.length === 0) {
      response.status(404).send({
        msg: "Editable with provided parameter not found.",
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
};

export const getEditableById = async (request, response) => {
  const editable_id = parseInt(request.params.editable_id);

  try {
    if (isNaN(editable_id)) {
      response.status(400).send({ msg: "Bad request. Invalid editable id." });
      return;
    }

    const editablesQuery = await prisma.editables.findUnique({
      where: {
        id: editable_id,
      },
    });

    if (!editablesQuery) {
      response.status(404).send({ msg: "Editable with provided id not found." });
      return;
    }

    response.json(editablesQuery);
  } catch (error) {
    console.error("Error fetching editable:", error);
    response
      .status(500)
      .send({ error: "An error occurred while fetching editable." });
  }
};


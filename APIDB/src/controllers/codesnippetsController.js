import prisma from "../models/prismaClient.js";

export const getAllCodeSnippetsOrByParams = async (request, response) => {
  try {
    const { filter, value } = request.query; // Extract query parameters
    console.log(request.query);

    let codeSnippetsQuery = await prisma.codesnippets.findMany();

    if (!filter && !value) return response.send(codeSnippetsQuery);

    // If no filter key is provided but a value is given, search for the value across all fields
    if (value && !filter) {
      codeSnippetsQuery = codeSnippetsQuery.filter((codesnippet) =>
        Object.values(codesnippet).some((field) =>
          field?.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
    }

    // If both filter and value are provided, filter by the specific field
    else if (filter && value) {
      codeSnippetsQuery = codeSnippetsQuery.filter((codesnippet) =>
        codesnippet[filter]?.toString().toLowerCase().includes(value.toLowerCase())
      );
    }

    if (codeSnippetsQuery.length === 0) {
      response.status(404).send({
        msg: "Code Snippet with provided parameter not found.",
      });
      return;
    }

    response.json(codeSnippetsQuery);
  } catch (error) {
    console.error("Error fetching code snippet:", error);
    response
      .status(500)
      .send({ error: "An error occurred while fetching code snippets." });
  }
};

export const getCodeSnippetById = async (request, response) => {
  const codesnippet_id = parseInt(request.params.codesnippet_id);

  try {
    if (isNaN(codesnippet_id)) {
      response.status(400).send({ msg: "Bad request. Invalid code snippet id." });
      return;
    }

    const codeSnippetsQuery = await prisma.codesnippets.findUnique({
      where: {
        id: codesnippet_id,
      },
    });

    if (!codeSnippetsQuery) {
      response.status(404).send({ msg: "Code Snippet with provided id not found." });
      return;
    }

    response.json(codeSnippetsQuery);
  } catch (error) {
    console.error("Error fetching code snippet:", error);
    response
      .status(500)
      .send({ error: "An error occurred while fetching code snippet." });
  }
};

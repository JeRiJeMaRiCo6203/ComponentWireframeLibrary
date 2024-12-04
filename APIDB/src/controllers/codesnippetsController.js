import prisma from "../models/prismaClient.js";

export const getAllCodeSnippetsOrByParams = async (request, response) => {
  try {
    const { filter, value } = request.query; // Extract query parameters
    console.log(request.query);

    let codeSnippetsQuery = await prisma.codesnippets.findMany();

    if (!filter && !value) return response.send(codeSnippetsQuery);

    // If no filter key is provided but a value is given, search for the value across all fields
    if (value && !filter) {
      codeSnippetsQuery = codeSnippetsQuery.filter((category) =>
        Object.values(category).some((field) =>
          field?.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
    }

    // If both filter and value are provided, filter by the specific field
    else if (filter && value) {
      codeSnippetsQuery = codeSnippetsQuery.filter((category) =>
        category[filter]?.toString().toLowerCase().includes(value.toLowerCase())
      );
    }

    // If no categories are found, return a 404 response
    if (codeSnippetsQuery.length === 0) {
      response.status(404).send({
        msg: "Not found. Code Snippet with provided parameter not found.",
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
  const id = parseInt(request.params.id);

  try {
    if (isNaN(id)) {
      response.status(400).send({ msg: "Bad request. Invalid category id." });
      return;
    }

    const codeSnippetsQuery = await prisma.codesnippets.findUnique({
      where: {
        id: id,
      },
    });

    if (!codeSnippetsQuery) {
      response.status(404).send({ msg: "Not found. Code Snippet not found." });
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

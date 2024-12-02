import prisma from "../models/prismaClient.js";

export const getWireframes = async (request, response) => {
    const wireframes = await prisma.wireframes.findMany();
    response.send(wireframes);
};
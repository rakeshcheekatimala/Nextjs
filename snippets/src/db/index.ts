import { PrismaClient } from "@prisma/client";

/*
    To do CRUD operations with our db models
*/

const db = new PrismaClient();

export default db;

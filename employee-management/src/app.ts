import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { EmployeeResolver } from './resolvers/EmployeeResolver';
import dotenv from 'dotenv';
import { DataSource } from "typeorm";
import { Employee } from "./entity/Employee";

dotenv.config();
const AppDataSource = new DataSource({
    type: process.env.DB_TYPE as "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432", 10), // Provide default value and ensure it's a number
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Employee],
    synchronize: true, 
});

async function main() {
    await AppDataSource.initialize().catch((error) => {
        console.error("Error during Data Source initialization", error);
    });

    const schema = await buildSchema({
        resolvers: [EmployeeResolver],
    });

    const server = new ApolloServer({ schema });

    const { url } = await server.listen(4000);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
}

main().catch(error => {
    console.error(error);
});

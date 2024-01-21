import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { EmployeeResolver } from './resolvers/EmployeeResolver';

import { DataSource } from "typeorm";
import { Employee } from "./entity/Employee";


const AppDataSource = new DataSource({
    type: "postgres", 
    host: "localhost",
    port: 5432,
    username: "tonsonwang",
    password: "123456789",
    database: "employee",
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

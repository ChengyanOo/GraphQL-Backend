import { buildSchema } from 'type-graphql';
import { graphql } from 'graphql';
import { EmployeeResolver } from '../../resolvers/EmployeeResolver';

async function buildTypeGraphQLSchema() {
    return buildSchema({
        resolvers: [EmployeeResolver], 
    });
}

export const graphqlTestCall = async (
    query: any,
    variables?: any
) => {
    const schema = await buildTypeGraphQLSchema();

    return graphql(
        schema,
        query,
        undefined,
        {},
        variables
    );
};

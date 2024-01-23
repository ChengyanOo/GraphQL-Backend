"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlTestCall = void 0;
const type_graphql_1 = require("type-graphql");
const graphql_1 = require("graphql");
const EmployeeResolver_1 = require("../../resolvers/EmployeeResolver");
function buildTypeGraphQLSchema() {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, type_graphql_1.buildSchema)({
            resolvers: [EmployeeResolver_1.EmployeeResolver],
        });
    });
}
const graphqlTestCall = (query, variables) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = yield buildTypeGraphQLSchema();
    return (0, graphql_1.graphql)(schema, query, undefined, {}, variables);
});
exports.graphqlTestCall = graphqlTestCall;

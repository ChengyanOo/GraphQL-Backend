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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_1 = require("apollo-server");
const type_graphql_1 = require("type-graphql");
const EmployeeResolver_1 = require("./resolvers/EmployeeResolver");
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const Employee_1 = require("./entity/Employee");
dotenv_1.default.config();
const AppDataSource = new typeorm_1.DataSource({
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432", 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Employee_1.Employee],
    synchronize: true,
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield AppDataSource.initialize().catch((error) => {
            console.error("Error during Data Source initialization", error);
        });
        const schema = yield (0, type_graphql_1.buildSchema)({
            resolvers: [EmployeeResolver_1.EmployeeResolver],
        });
        const server = new apollo_server_1.ApolloServer({ schema });
        const { url } = yield server.listen(4000);
        console.log(`Server is running, GraphQL Playground available at ${url}`);
    });
}
main().catch(error => {
    console.error(error);
});

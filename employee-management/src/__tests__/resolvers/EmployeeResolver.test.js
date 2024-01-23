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
const typeorm_1 = require("typeorm");
const graphqlTestCall_1 = require("../utils/graphqlTestCall");
const Employee_1 = require("../../entity/Employee");
const dotenv_1 = __importDefault(require("dotenv"));
const querys_1 = require("../utils/querys");
dotenv_1.default.config();
const TestDataSource = new typeorm_1.DataSource({
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432", 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Employee_1.Employee],
    synchronize: true,
    dropSchema: true
});
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield TestDataSource.initialize().catch((error) => {
        console.error("Error during Test Data Source initialization", error);
    });
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield TestDataSource.destroy();
}));
describe("Testresolvers", () => {
    let createdEmployeeIds = [];
    it("should create a new employee", () => __awaiter(void 0, void 0, void 0, function* () {
        const testEmployee = {
            data: {
                firstName: "Yan",
                lastName: "Wang",
                dateOfJoining: "2023-01-22",
                dateOfBirth: "2000-12-7",
                salary: 50000,
                title: "Software Engineer",
                department: "Dev"
            }
        };
        const createResponse = yield (0, graphqlTestCall_1.graphqlTestCall)(querys_1.createEmployeeMutation, {
            data: testEmployee.data
        });
        expect(createResponse.data.createEmployee).toBeDefined();
        createdEmployeeIds[0] = (yield createResponse.data.createEmployee.id);
    }));
    it("should delete an employee by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const deleteResponse = yield (0, graphqlTestCall_1.graphqlTestCall)(querys_1.deleteEmployeeMutation, {
            deleteEmployeeId: Number(createdEmployeeIds[0])
        });
        expect(deleteResponse.data.deleteEmployee).toBe(true);
        const fetchDeletedEmployeeResponse = yield (0, graphqlTestCall_1.graphqlTestCall)(querys_1.getEmployeeQuery, {});
        expect(fetchDeletedEmployeeResponse.data.employees).toEqual([]);
    }));
    it("should sort employees by date of joining", () => __awaiter(void 0, void 0, void 0, function* () {
        // Create multiple employees with different joining dates
        for (const employee of [
            { dateOfJoining: "2023-01-20", firstName: "Alice", lastName: "Johnson", dateOfBirth: "1990-12-07", salary: 60000, title: "Backend Developer", department: "Development" },
            { dateOfJoining: "2023-01-22", firstName: "Bob", lastName: "Smith", dateOfBirth: "1985-05-15", salary: 70000, title: "Frontend Developer", department: "Development" },
            { dateOfJoining: "2023-01-21", firstName: "Charlie", lastName: "Davis", dateOfBirth: "1992-08-20", salary: 55000, title: "DevOps Engineer", department: "Operations" }
        ]) {
            const createResponse = yield (0, graphqlTestCall_1.graphqlTestCall)(querys_1.createEmployeeMutation, {
                data: employee
            });
            expect(createResponse.data.createEmployee).toBeDefined();
            createdEmployeeIds.push(createResponse.data.createEmployee.id);
        }
        // Fetch and sort employees by date of joining in ascending order
        const fetchSortedEmployeesResponse = yield (0, graphqlTestCall_1.graphqlTestCall)(querys_1.getEmployeeWithOptionQuery, {
            orderBy: "dateOfJoining",
            orderDirection: "ASC"
        });
        // Check if the employees are sorted correctly
        const sortedEmployees = fetchSortedEmployeesResponse.data.employees;
        expect(sortedEmployees.length).toBe(3);
        expect(sortedEmployees[0].firstName).toBe("Alice");
        expect(sortedEmployees[1].firstName).toBe("Charlie");
        expect(sortedEmployees[2].firstName).toBe("Bob");
        for (const id of createdEmployeeIds) {
            yield (0, graphqlTestCall_1.graphqlTestCall)(querys_1.deleteEmployeeMutation, {
                deleteEmployeeId: Number(id)
            });
        }
        const fetchDeletedEmployeeResponse = yield (0, graphqlTestCall_1.graphqlTestCall)(querys_1.getEmployeeQuery, {});
        expect(fetchDeletedEmployeeResponse.data.employees).toEqual([]);
    }));
    it("should sort employees by salary", () => __awaiter(void 0, void 0, void 0, function* () {
        // Create multiple employees with different salaries
        for (const employee of [
            { dateOfJoining: "2023-01-22", firstName: "Eve", lastName: "Wallace", dateOfBirth: "1989-10-12", salary: 55000, title: "UI/UX Designer", department: "Design" },
            { dateOfJoining: "2023-01-23", firstName: "Frank", lastName: "Mitchell", dateOfBirth: "1988-04-23", salary: 50000, title: "QA Tester", department: "Quality Assurance" },
            { dateOfJoining: "2023-01-21", firstName: "Grace", lastName: "Hopper", dateOfBirth: "1991-12-09", salary: 65000, title: "System Architect", department: "Architecture" }
        ]) {
            const createResponse = yield (0, graphqlTestCall_1.graphqlTestCall)(querys_1.createEmployeeMutation, {
                data: employee
            });
            expect(createResponse.data.createEmployee).toBeDefined();
            createdEmployeeIds.push(createResponse.data.createEmployee.id);
        }
        // Fetch and sort employees by salary in ascending order
        const fetchSortedEmployeesResponse = yield (0, graphqlTestCall_1.graphqlTestCall)(querys_1.getEmployeeWithOptionQuery, {
            orderBy: "salary",
            orderDirection: "asc"
        });
        // Check if the employees are sorted correctly by salary
        const sortedEmployees = fetchSortedEmployeesResponse.data.employees;
        expect(sortedEmployees.length).toBe(3);
        expect(sortedEmployees[0].firstName).toBe("Frank"); // Expect the lowest salary first
        expect(sortedEmployees[1].firstName).toBe("Eve");
        expect(sortedEmployees[2].firstName).toBe("Grace"); // Expect the highest salary last
        // Cleanup: Delete created employees
        for (const id of createdEmployeeIds) {
            yield (0, graphqlTestCall_1.graphqlTestCall)(querys_1.deleteEmployeeMutation, {
                deleteEmployeeId: Number(id)
            });
        }
        const fetchDeletedEmployeeResponse = yield (0, graphqlTestCall_1.graphqlTestCall)(querys_1.getEmployeeQuery, {});
        expect(fetchDeletedEmployeeResponse.data.employees).toEqual([]);
    }));
    it("should filter employees by department", () => __awaiter(void 0, void 0, void 0, function* () {
        for (const employee of [
            { dateOfJoining: "2023-01-22", firstName: "Laura", lastName: "Adams", dateOfBirth: "1989-10-12", salary: 55000, title: "UI/UX Designer", department: "Design" },
            { dateOfJoining: "2023-01-23", firstName: "Mark", lastName: "Johnson", dateOfBirth: "1988-04-23", salary: 50000, title: "QA Tester", department: "Quality Assurance" },
            { dateOfJoining: "2023-01-21", firstName: "Nancy", lastName: "Davis", dateOfBirth: "1991-12-09", salary: 65000, title: "Project Manager", department: "Management" },
            { dateOfJoining: "2023-01-24", firstName: "Oscar", lastName: "Brown", dateOfBirth: "1990-05-19", salary: 70000, title: "Developer", department: "Design" }
        ]) {
            const createResponse = yield (0, graphqlTestCall_1.graphqlTestCall)(querys_1.createEmployeeMutation, {
                data: employee
            });
            expect(createResponse.data.createEmployee).toBeDefined();
            createdEmployeeIds.push(createResponse.data.createEmployee.id);
        }
        // Fetch employees filtered by department 'Design'
        const filteredEmployeesResponse = yield (0, graphqlTestCall_1.graphqlTestCall)(querys_1.getEmployeeWithOptionQuery, {
            department: "Design"
        });
        // Check if the returned employees belong to the department 'Design'
        const filteredEmployees = filteredEmployeesResponse.data.employees;
        expect(filteredEmployees.length).toBe(2); // Expect two employees in the 'Design' department
        const allInDesign = filteredEmployees.every((employee) => employee.department === "Design");
        expect(allInDesign).toBe(true);
        // Cleanup: Delete created employees
        for (const id of createdEmployeeIds) {
            yield (0, graphqlTestCall_1.graphqlTestCall)(querys_1.deleteEmployeeMutation, {
                deleteEmployeeId: Number(id)
            });
        }
        const fetchDeletedEmployeeResponse = yield (0, graphqlTestCall_1.graphqlTestCall)(querys_1.getEmployeeQuery, {});
        expect(fetchDeletedEmployeeResponse.data.employees).toEqual([]);
    }));
    it("should filter employees by range of salary", () => __awaiter(void 0, void 0, void 0, function* () {
        // Create multiple employees with different salaries
        for (const employee of [
            { dateOfJoining: "2023-01-22", firstName: "Peter", lastName: "Parker", dateOfBirth: "1990-10-12", salary: 45000, title: "Junior Developer", department: "Development" },
            { dateOfJoining: "2023-01-23", firstName: "Tony", lastName: "Stark", dateOfBirth: "1985-04-23", salary: 95000, title: "Senior Developer", department: "Development" },
            { dateOfJoining: "2023-01-21", firstName: "Steve", lastName: "Rogers", dateOfBirth: "1992-08-20", salary: 65000, title: "Product Manager", department: "Management" }
        ]) {
            const createResponse = yield (0, graphqlTestCall_1.graphqlTestCall)(querys_1.createEmployeeMutation, {
                data: employee
            });
            expect(createResponse.data.createEmployee).toBeDefined();
            createdEmployeeIds.push(createResponse.data.createEmployee.id);
        }
        // Fetch employees filtered by a salary range (50000 to 70000)
        const filteredEmployeesResponse = yield (0, graphqlTestCall_1.graphqlTestCall)(querys_1.getEmployeeWithOptionQuery, {
            minSalary: 50000,
            maxSalary: 70000
        });
        // Check if the returned employees have salaries within the range 50000 to 70000
        const filteredEmployees = filteredEmployeesResponse.data.employees;
        expect(filteredEmployees.every((employee) => employee.salary >= 50000 && employee.salary <= 70000)).toBe(true);
        expect(filteredEmployees.length).toBe(1); // Expect 1 employee in this salary range
        // Cleanup: Delete created employees
        for (const id of createdEmployeeIds) {
            yield (0, graphqlTestCall_1.graphqlTestCall)(querys_1.deleteEmployeeMutation, {
                deleteEmployeeId: Number(id)
            });
        }
        const fetchDeletedEmployeeResponse = yield (0, graphqlTestCall_1.graphqlTestCall)(querys_1.getEmployeeQuery, {});
        expect(fetchDeletedEmployeeResponse.data.employees).toEqual([]);
    }));
    it("should query details of employee by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const testEmployee = {
            data: {
                firstName: "Bruce",
                lastName: "Wayne",
                dateOfJoining: "2023-01-22",
                dateOfBirth: "1980-12-7",
                salary: 80000,
                title: "CEO",
                department: "Management"
            }
        };
        const createResponse = yield (0, graphqlTestCall_1.graphqlTestCall)(querys_1.createEmployeeMutation, {
            data: testEmployee.data
        });
        expect(createResponse.data.createEmployee).toBeDefined();
        createdEmployeeIds[0] = createResponse.data.createEmployee.id;
        // Fetch the created employee by ID
        const fetchEmployeeResponse = yield (0, graphqlTestCall_1.graphqlTestCall)(querys_1.getEmployeeQuery, {
            id: Number(createdEmployeeIds[0])
        });
        // Check if the returned employee details match the created employee
        const fetchedEmployee = fetchEmployeeResponse.data.employees[0];
        expect(fetchedEmployee).toBeDefined();
        expect(fetchedEmployee.id).toBe(createdEmployeeIds[0]);
        expect(fetchedEmployee.firstName).toBe(testEmployee.data.firstName);
        expect(fetchedEmployee.lastName).toBe(testEmployee.data.lastName);
        const expectedDate = new Date(testEmployee.data.dateOfJoining);
        const receivedDate = new Date(fetchedEmployee.dateOfJoining);
        expect(receivedDate.getFullYear()).toBe(expectedDate.getFullYear());
        expect(receivedDate.getMonth()).toBe(expectedDate.getMonth());
        expect(receivedDate.getDate()).toBe(expectedDate.getDate());
        expect(fetchedEmployee.salary).toBe(testEmployee.data.salary);
        expect(fetchedEmployee.title).toBe(testEmployee.data.title);
        expect(fetchedEmployee.department).toBe(testEmployee.data.department);
        // Cleanup: Delete the created employee
        yield (0, graphqlTestCall_1.graphqlTestCall)(querys_1.deleteEmployeeMutation, {
            deleteEmployeeId: Number(createdEmployeeIds[0])
        });
        const fetchDeletedEmployeeResponse = yield (0, graphqlTestCall_1.graphqlTestCall)(querys_1.getEmployeeQuery, {});
        expect(fetchDeletedEmployeeResponse.data.employees).toEqual([]);
    }));
    it("should update details of employee by id", () => __awaiter(void 0, void 0, void 0, function* () {
        //Create an employee
        const testEmployee = {
            data: {
                firstName: "Clark",
                lastName: "Kent",
                dateOfJoining: "2023-01-22",
                dateOfBirth: "1990-06-18",
                salary: 75000,
                title: "Reporter",
                department: "Media"
            }
        };
        const createResponse = yield (0, graphqlTestCall_1.graphqlTestCall)(querys_1.createEmployeeMutation, {
            data: testEmployee.data
        });
        expect(createResponse.data.createEmployee).toBeDefined();
        createdEmployeeIds[0] = createResponse.data.createEmployee.id;
        //Update the created employee by ID
        const updatedEmployeeData = {
            firstName: "Clark",
            lastName: "Superman",
            dateOfJoining: "2023-01-22",
            dateOfBirth: "1990-06-18",
            salary: 80000,
            title: "Senior Reporter",
            department: "Media"
        };
        const updateResponse = yield (0, graphqlTestCall_1.graphqlTestCall)(querys_1.updateEmployeeMutation, {
            id: Number(createdEmployeeIds[0]),
            data: updatedEmployeeData
        });
        expect(updateResponse.data.updateEmployee).toBeDefined();
        //Fetch the updated employee by ID
        const fetchUpdatedEmployeeResponse = yield (0, graphqlTestCall_1.graphqlTestCall)(querys_1.getEmployeeQuery, {
            id: Number(createdEmployeeIds[0])
        });
        //Check if the returned employee details match the updated details
        const updatedEmployee = fetchUpdatedEmployeeResponse.data.employees[0]; // Adjust based on your actual response structure
        expect(updatedEmployee).toBeDefined();
        expect(updatedEmployee.id).toBe(createdEmployeeIds[0]);
        expect(updatedEmployee.firstName).toBe(updatedEmployeeData.firstName);
        expect(updatedEmployee.lastName).toBe(updatedEmployeeData.lastName);
        const expectedDate = new Date(updatedEmployee.dateOfJoining);
        const receivedDate = new Date(updatedEmployeeData.dateOfJoining);
        expect(receivedDate.getFullYear()).toBe(expectedDate.getFullYear());
        expect(receivedDate.getMonth()).toBe(expectedDate.getMonth());
        expect(receivedDate.getDate()).toBe(expectedDate.getDate());
        expect(updatedEmployee.salary).toBe(updatedEmployeeData.salary);
        expect(updatedEmployee.title).toBe(updatedEmployeeData.title);
        expect(updatedEmployee.department).toBe(updatedEmployeeData.department);
        // Cleanup: Delete the created/updated employee
        yield (0, graphqlTestCall_1.graphqlTestCall)(querys_1.deleteEmployeeMutation, {
            deleteEmployeeId: Number(createdEmployeeIds[0])
        });
        const fetchDeletedEmployeeResponse = yield (0, graphqlTestCall_1.graphqlTestCall)(querys_1.getEmployeeQuery, {});
        expect(fetchDeletedEmployeeResponse.data.employees).toEqual([]);
    }));
    it("should query all employees", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, graphqlTestCall_1.graphqlTestCall)(querys_1.getEmployeeQuery, {});
        expect(response.data.employees).toBeDefined();
    }));
});

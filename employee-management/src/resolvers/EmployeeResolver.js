"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.EmployeeResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Employee_1 = require("../entity/Employee");
const EmployeeSchema_1 = require("../schemas/EmployeeSchema");
const typeorm_1 = require("typeorm");
const EmployeeInput_1 = require("../input/EmployeeInput");
// Defining a resolver for EmployeeSchema
let EmployeeResolver = class EmployeeResolver {
    // GraphQL Query to get employees with options for sorting and filtering
    employees(orderBy, orderDirection, title, department, minSalary, maxSalary) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderOptions = orderBy ? { [orderBy]: orderDirection } : {};
            const whereOptions = {};
            if (title)
                whereOptions.title = title;
            if (department)
                whereOptions.department = department;
            // Handling salary range conditions
            if (minSalary !== undefined && maxSalary !== undefined) {
                whereOptions.salary = (0, typeorm_1.Between)(minSalary, maxSalary);
            }
            else if (minSalary !== undefined) {
                whereOptions.salary = (0, typeorm_1.MoreThanOrEqual)(minSalary);
            }
            else if (maxSalary !== undefined) {
                whereOptions.salary = (0, typeorm_1.LessThanOrEqual)(maxSalary);
            }
            // Combining order and where options into find options
            const findOptions = {
                order: orderOptions,
                where: whereOptions
            };
            // Fetching employees from the database based on the find options
            const employees = yield Employee_1.Employee.find(findOptions);
            return employees;
        });
    }
    // GraphQL Query to get a single employee by ID
    employee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield Employee_1.Employee.findOne({ where: { id } });
            return employee;
        });
    }
    // GraphQL Mutation to create a new employee
    createEmployee(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = new Employee_1.Employee();
            Object.assign(employee, data);
            yield employee.save();
            return employee;
        });
    }
    // GraphQL Mutation to update an existing employee
    updateEmployee(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Employee_1.Employee.update(id, data);
            return this.employee(id);
        });
    }
    // GraphQL Mutation to delete an employee
    deleteEmployee(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const deleteResult = yield Employee_1.Employee.delete(id);
            return ((_a = deleteResult.affected) !== null && _a !== void 0 ? _a : 0) > 0;
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [EmployeeSchema_1.EmployeeSchema]),
    __param(0, (0, type_graphql_1.Arg)('orderBy', () => String, { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)('orderDirection', () => String, { defaultValue: 'ASC' })),
    __param(2, (0, type_graphql_1.Arg)('title', () => String, { nullable: true })),
    __param(3, (0, type_graphql_1.Arg)('department', () => String, { nullable: true })),
    __param(4, (0, type_graphql_1.Arg)('minSalary', () => type_graphql_1.Float, { nullable: true })),
    __param(5, (0, type_graphql_1.Arg)('maxSalary', () => type_graphql_1.Float, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], EmployeeResolver.prototype, "employees", null);
__decorate([
    (0, type_graphql_1.Query)(() => EmployeeSchema_1.EmployeeSchema, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EmployeeResolver.prototype, "employee", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => EmployeeSchema_1.EmployeeSchema),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EmployeeInput_1.EmployeeInput]),
    __metadata("design:returntype", Promise)
], EmployeeResolver.prototype, "createEmployee", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => EmployeeSchema_1.EmployeeSchema),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, EmployeeInput_1.EmployeeInput]),
    __metadata("design:returntype", Promise)
], EmployeeResolver.prototype, "updateEmployee", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EmployeeResolver.prototype, "deleteEmployee", null);
EmployeeResolver = __decorate([
    (0, type_graphql_1.Resolver)(of => EmployeeSchema_1.EmployeeSchema)
], EmployeeResolver);
exports.EmployeeResolver = EmployeeResolver;

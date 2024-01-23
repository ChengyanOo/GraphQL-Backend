"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployeeMutation = exports.updateEmployeeMutation = exports.getEmployeeWithOptionQuery = exports.createEmployeeMutation = exports.getEmployeeQuery = void 0;
exports.getEmployeeQuery = `
query GetAllEmployee{
  employees {
    id
    firstName
    lastName
    salary
    department
    title
    dateOfBirth
    dateOfJoining
  }
}
`;
exports.createEmployeeMutation = `
mutation CreateEmployee($data: EmployeeInput!) {
  createEmployee(data: $data) {
    id
    firstName
    lastName
    dateOfJoining
    dateOfBirth
    salary
    title
    department
  }
}
`;
exports.getEmployeeWithOptionQuery = `
query GetEmployees(
  $orderBy: String,
  $orderDirection: String,
  $title: String,
  $department: String,
  $minSalary: Float,
  $maxSalary: Float
) {
  employees(
    orderBy: $orderBy,
    orderDirection: $orderDirection,
    title: $title,
    department: $department,
    minSalary: $minSalary,
    maxSalary: $maxSalary
  ) {
    firstName
    lastName
    department
    salary
  }
}
`;
exports.updateEmployeeMutation = `
mutation UpdateEmployee($id: Float!, $data: EmployeeInput!) {
  updateEmployee(id: $id, data: $data) {
    id
    firstName
    lastName
    dateOfJoining
    dateOfBirth
    salary
    title
    department
  }
}
`;
exports.deleteEmployeeMutation = `
mutation DeleteEmployee($deleteEmployeeId: Float!){
  deleteEmployee(id: $deleteEmployeeId)
}
`;

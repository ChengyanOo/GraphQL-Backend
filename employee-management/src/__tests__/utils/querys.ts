export const getEmployeeQuery = `
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

export const createEmployeeMutation = `
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

export const getEmployeeWithOptionQuery = `
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

export const updateEmployeeMutation = `
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

export const deleteEmployeeMutation = `
mutation DeleteEmployee($deleteEmployeeId: Float!){
  deleteEmployee(id: $deleteEmployeeId)
}
`;
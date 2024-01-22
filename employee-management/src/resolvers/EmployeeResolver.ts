import { Query, Resolver, Arg, Float, Mutation } from 'type-graphql';
import { Employee } from '../entity/Employee';
import { EmployeeSchema } from '../schemas/EmployeeSchema';
import { Between, FindManyOptions, FindOptionsWhere, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { EmployeeInput } from '../input/EmployeeInput';

// Defining a resolver for EmployeeSchema
@Resolver(of => EmployeeSchema)
export class EmployeeResolver {
    
    // GraphQL Query to get employees with options for sorting and filtering
    @Query(() => [EmployeeSchema])
    async employees(
        @Arg('orderBy', () => String, { nullable: true }) orderBy?: string,
        @Arg('orderDirection', () => String, { defaultValue: 'ASC' }) orderDirection?: 'ASC' | 'DESC',
        @Arg('title', () => String, { nullable: true }) title?: string,
        @Arg('department', () => String, { nullable: true }) department?: string,
        @Arg('minSalary', () => Float, { nullable: true }) minSalary?: number,
        @Arg('maxSalary', () => Float, { nullable: true }) maxSalary?: number
    ): Promise<EmployeeSchema[]> {
        const orderOptions = orderBy ? { [orderBy]: orderDirection } : {};
        const whereOptions: FindOptionsWhere<Employee> = {};
        if (title) whereOptions.title = title;
        if (department) whereOptions.department = department;
        // Handling salary range conditions
        if (minSalary !== undefined && maxSalary !== undefined) {
            whereOptions.salary = Between(minSalary, maxSalary);
        } else if (minSalary !== undefined) {
            whereOptions.salary = MoreThanOrEqual(minSalary);
        } else if (maxSalary !== undefined) {
            whereOptions.salary = LessThanOrEqual(maxSalary);
        }

        // Combining order and where options into find options
        const findOptions: FindManyOptions<Employee> = {
            order: orderOptions,
            where: whereOptions
        };

        // Fetching employees from the database based on the find options
        const employees = await Employee.find(findOptions);
        return employees;
    }

    // GraphQL Query to get a single employee by ID
    @Query(() => EmployeeSchema, { nullable: true })
    async employee(@Arg('id') id: number): Promise<EmployeeSchema | null> {
        const employee = await Employee.findOne({ where: { id } });
        return employee;
    }

    // GraphQL Mutation to create a new employee
    @Mutation(() => EmployeeSchema)
    async createEmployee(@Arg('data') data: EmployeeInput): Promise<EmployeeSchema> {
        const employee = new Employee();
        Object.assign(employee, data);
        await employee.save();
        return employee;
    }

    // GraphQL Mutation to update an existing employee
    @Mutation(() => EmployeeSchema)
    async updateEmployee(
        @Arg('id') id: number,
        @Arg('data') data: EmployeeInput
    ): Promise<EmployeeSchema | null> {
        await Employee.update(id, data);
        return this.employee(id);
    }

    // GraphQL Mutation to delete an employee
    @Mutation(() => Boolean)
    async deleteEmployee(@Arg('id') id: number): Promise<boolean> {
        const deleteResult = await Employee.delete(id);
        return (deleteResult.affected ?? 0) > 0; 
    }
}
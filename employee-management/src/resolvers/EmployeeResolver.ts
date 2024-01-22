import { Query, Resolver, Arg, Float, Mutation } from 'type-graphql';
import { Employee } from '../entity/Employee';
import { EmployeeSchema } from '../schemas/EmployeeSchema';
import { Between, FindManyOptions, FindOptionsWhere, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { EmployeeInput } from '../input/EmployeeInput';

@Resolver(of => EmployeeSchema)
export class EmployeeResolver {
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
        if (minSalary !== undefined && maxSalary !== undefined) {
            whereOptions.salary = Between(minSalary, maxSalary);
        } else if (minSalary !== undefined) {
            whereOptions.salary = MoreThanOrEqual(minSalary);
        } else if (maxSalary !== undefined) {
            whereOptions.salary = LessThanOrEqual(maxSalary);
        }

        const findOptions: FindManyOptions<Employee> = {
            order: orderOptions,
            where: whereOptions
        };

        const employees = await Employee.find(findOptions);
        return employees;
    }


    @Query(() => EmployeeSchema, { nullable: true })
    async employee(@Arg('id') id: number): Promise<EmployeeSchema | null> {
        const employee = await Employee.findOne({ where: { id } });
        return employee;
    }

    @Mutation(() => EmployeeSchema)
    async createEmployee(@Arg('data') data: EmployeeInput): Promise<EmployeeSchema> {
        const employee = new Employee();
        Object.assign(employee, data);
        await employee.save();
        return employee;
    }

    @Mutation(() => EmployeeSchema)
    async updateEmployee(
        @Arg('id') id: number,
        @Arg('data') data: EmployeeInput
    ): Promise<EmployeeSchema | null> {
        await Employee.update(id, data);
        return this.employee(id);
    }

    @Mutation(() => Boolean)
    async deleteEmployee(@Arg('id') id: number): Promise<boolean> {
        const deleteResult = await Employee.delete(id);
        return (deleteResult.affected ?? 0) > 0;  // Use the nullish coalescing operator (??)
    }
}
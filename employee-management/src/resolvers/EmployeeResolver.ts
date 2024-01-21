import { Query, Resolver, Arg } from 'type-graphql';
import { Employee } from '../entity/Employee';
import { EmployeeSchema } from '../schemas/EmployeeSchema';

@Resolver(of => EmployeeSchema)
export class EmployeeResolver {
    @Query(() => [EmployeeSchema])
    async employees(): Promise<EmployeeSchema[]> {
        const employees = await Employee.find();
        return employees;
    }
}
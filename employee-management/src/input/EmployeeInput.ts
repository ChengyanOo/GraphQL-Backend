import { InputType, Field, Float } from 'type-graphql';

@InputType()
export class EmployeeInput {
    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    dateOfJoining: Date;

    @Field()
    dateOfBirth: Date;

    @Field(() => Float)
    salary: number;

    @Field()
    title: string;

    @Field()
    department: string;
}

import { ObjectType, Field, ID, Float } from 'type-graphql';

@ObjectType()
export class EmployeeSchema {
    @Field(() => ID)
    id: number;

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

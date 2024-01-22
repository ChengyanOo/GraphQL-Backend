import { InputType, Field, Float } from 'type-graphql';
import { IsString, IsDate, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class EmployeeInput {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    firstName?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    lastName?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsDate()
    dateOfJoining?: Date;

    @Field({ nullable: true })
    @IsOptional()
    @IsDate()
    dateOfBirth?: Date;

    @Field(() => Float, { nullable: true })
    @IsOptional()
    @IsNumber()
    salary?: number;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    title?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    department?: string;
}
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Employee extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    dateOfJoining: Date;

    @Column()
    dateOfBirth: Date;

    @Column('float')
    salary: number;

    @Column()
    title: string;

    @Column()
    department: string;
}

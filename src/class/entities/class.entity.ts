
import { Enrollment } from "src/enrollment/entities/enrollment.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Class {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name : string

    @Column()
    level : string

    @Column()
    tuition_fee : number

    @OneToMany(() => Enrollment, enrollment => enrollment.class)
    enrollments: Enrollment[]
}

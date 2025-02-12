import { Enrollment } from "src/enrollment/entities/enrollment.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'varchar',nullable: false})
    user_id : string

    @OneToOne(() => User,(user)=> user.teacher)
    @JoinColumn({name: 'user_id'})
    user: User

    @OneToMany(() => Enrollment,enrollment=> enrollment.student)
    enrollments: Enrollment[]

}

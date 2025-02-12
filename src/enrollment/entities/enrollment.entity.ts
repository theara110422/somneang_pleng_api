import { Class } from "src/class/entities/class.entity";
import { Student } from "src/student/entities/student.entity";
import { Teacher } from "src/teacher/entities/teacher.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Enrollment {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Class, class_ => class_.enrollments)
    class: Class

    @ManyToOne(() => Student, student => student.enrollments)
    student : Student

    @ManyToOne(() => Teacher, teacher => teacher.enrollments)
    teacher: Teacher


    @Column()
    dateRegister: Date;

    @Column({default : null})
    empressBy : string;

    @Column()
    time: string;

    @Column()
    startDate : Date;

    @Column()
    endDate : Date;

    @Column()
    classDay: string;

    
}

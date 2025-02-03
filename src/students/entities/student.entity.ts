import { User } from "src/user/entities/user.entity";
import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export class Student {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    gender: string;

    @Column()
    age: number;

    // @Column({type: 'varchar',nullable: false})
    // user_id: string

    // @OneToOne(()=> User)
    // @JoinColumn({name: 'user_id'})
    // user: User
    

    // @OneToOne(() => User, user => user.student)
    // @JoinColumn({name: 'user_id'})
    // user: User

}

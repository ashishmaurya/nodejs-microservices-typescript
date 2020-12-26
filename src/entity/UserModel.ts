import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_model')
export class UserModel {
    
    @PrimaryGeneratedColumn()
    id: Number;

    @Column({
        type: 'varchar',
        length: 255,
    })
    email: String;

    @Column({type:"varchar"})
    password:String;

    @Column({type:"date"})
    created_at:Date;
}
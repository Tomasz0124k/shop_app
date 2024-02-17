import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nazwa: string

    @Column()
    opis_skrot: string

    @Column()
    opis: number

}

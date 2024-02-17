import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"


@Entity()
export class Cart {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true,})
    date: string

    @Column()
    payment_date: string

    @Column()
    user: number

    @Column()
    price: number

    @Column({
        nullable: true,
        type: 'simple-json'
    })
    orderDetails: {
        products: Object[]
    }

    // @CreateDateColumn()
    // createDate: Date

    // @UpdateDateColumn()
    // updateDate: Date


}

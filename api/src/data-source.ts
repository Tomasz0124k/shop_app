import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Product } from "./entity/Product"
import { Cart } from "./entity/Cart"
import { config } from "./config"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: config.db.host,
    port: 5432,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    synchronize: false,
    logging: false,
    entities: [User, Product, Cart],
    migrations: [],
    subscribers: [],
})

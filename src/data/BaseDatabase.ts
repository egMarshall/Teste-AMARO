import knex, { Knex } from "knex"
import dotenv from 'dotenv'

dotenv.config()

export class BaseDataBase {

    protected static connection: Knex | null = null

    protected tableNames = {
        products: "AMARO_PRODUCTS",
        tags: "AMARO_TAGS",
        productTagsBridge: "AMARO_PRODUCT_TAG_BRIDGE"
    }

    protected getconnection(): Knex {
        if (!BaseDataBase.connection) {
            BaseDataBase.connection = knex({
                client: "mysql",
                connection: {
                    host: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_SCHEMA,
                    port: 3306,
                }
            })
        }
        return BaseDataBase.connection
    }
}
import { NotFoundError } from "../error/NotFoundError"
import { Product } from "../model/Product"
import { BaseDataBase } from "./BaseDatabase"

export class ProductDatabase extends BaseDataBase {

    public async createProduct (
        product: Product
    ): Promise<void> {
        try {
            await this.getconnection()
                .insert({
                    id: product.getId(),
                    name: product.getName()
                })
                .into(this.tableNames.products)
        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage)
        }
    }

    public async getProductById (
        id: string
    ): Promise<Product> {
        try {
            const result = await this.getconnection().raw(`
            SELECT
                p.id as product_id,
                p.name as product_name,
                t.tag_name as product_tags
            FROM ${this.tableNames.products} p
                INNER JOIN ${this.tableNames.productTagsBridge} b ON p.id = b.product_id
                INNER JOIN ${this.tableNames.tags} t ON b.tag_id = t.id
            WHERE p.id = "${id}"
            `)

            const product: any = {
                tags: []
            }

            if(!result[0][0]) {
                throw new NotFoundError(`Unable to find a product with id "${id}"`)
            }

            for (let p of result[0]) {
                product.id = p.product_id
                product.name = p.product_name
                product.tags.push(p.product_tags)
            }

            return Product.toProductModel(product)

        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage)
        }
    }
}
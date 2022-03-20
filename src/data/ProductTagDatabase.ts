import { NotFoundError } from "../error/NotFoundError"
import { Tag } from "../model/Tags"
import { BaseDataBase } from "./BaseDatabase"

export class ProductTagDatabase extends BaseDataBase {

        public async registerTagToProduct (
            product_id: string, tag_id: string
        ): Promise<void> {
            try {
                await this.getconnection()
                    .insert({product_id, tag_id})
                    .into(this.tableNames.productTagsBridge)
            } catch (error: any) {
                throw new Error(error.message || error.sqlMessage) 
            }
        }

        public async getProductTags (
            input: string
        ): Promise<Tag[]> {
            try {
                const productTags = await this.getconnection()
                .select()
                .from(this.tableNames.productTagsBridge)
                .where({product_id: input})

                if(!productTags) {
                    throw new NotFoundError(`Unable to find tags to the product with id "${input}"`)
                }

                return productTags as Tag[]
            } catch (error: any) {
                throw new Error(error.message || error.sqlMessage) 
            }
        }
}
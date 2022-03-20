import { ProductDatabase } from "../data/ProductDatabase"
import { ProductTagDatabase } from "../data/ProductTagDatabase"
import { TagsDatabase } from "../data/TagsDatabase"
import { InvalidInputError } from "../error/InvalidInputError"
import { Product, ProductInputDTO } from "../model/Product"
import { Tag } from "../model/Tags"
import { IdGenerator } from "../services/IdGenerator"

export class ProductBusiness {
    constructor(
        private ProductDatabase: ProductDatabase,
        private TagsDatabase: TagsDatabase,
        private ProductTagDatabase: ProductTagDatabase,
        private IdGenerator: IdGenerator
    ){}

    async createProduct(input: ProductInputDTO) {

        const product_id = this.IdGenerator.generate()

        await this.ProductDatabase.createProduct(
            Product.toProductModel({id: product_id, name: input.name.toUpperCase()})
        )

        input.tags.map(async (tag) => {
            const tag_name = tag
                .toLowerCase()
                .trim()
                .replace(/[\u0300-\u036f]/g, "")

            const tag_id = this.IdGenerator.generate()

            const productTag = await this.TagsDatabase.getTagByName(
                Tag.toTagModel({ id: tag_id, tag_name: tag_name })
            )

            const productTagToBridge = productTag.getTagId()

            await this.ProductTagDatabase.registerTagToProduct(product_id, productTagToBridge)
        })
    }

    async getProductById(input: string) {
        if (!input) {
            throw new InvalidInputError("Invalid input to Get Product By ID!")
        }

        return await this.ProductDatabase.getProductById(input)
    }

}
import { Request, Response } from "express"
import { ProductBusiness } from "../business/ProductBusiness"
import { ProductDatabase } from "../data/ProductDatabase"
import { ProductTagDatabase } from "../data/ProductTagDatabase"
import { TagsDatabase } from "../data/TagsDatabase"
import { ProductInputDTO } from "../model/Product"
import { IdGenerator } from "../services/IdGenerator"

export class ProductController {
    async create(req: Request, res: Response) {
        try {
            const input: ProductInputDTO = {
                name: req.body.name,
                tags: req.body.tags
            }

            const productBusiness = new ProductBusiness(
                new ProductDatabase(),
                new TagsDatabase(),
                new ProductTagDatabase(),
                new IdGenerator()
            )

            await productBusiness.createProduct(input)

            res.status(201).send({message: "Product sucessfully created!"})

        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send({message: error.message})
            } else {
                res.status(500).send({message: "Unexpected error!"})
            }
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = req.params.id

            const productBusiness = new ProductBusiness(
                new ProductDatabase(),
                new TagsDatabase(),
                new ProductTagDatabase(),
                new IdGenerator()
            )

            const product = await productBusiness.getProductById(id)

            res.status(200).send(product)

        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send({message: error.message})
            } else {
                res.status(500).send({message: "Unexpected error!"})
            }
        }
    }
}
import express from "express"
import { ProductController } from "../controller/ProductController"

export const productRouter = express.Router()
const productController = new ProductController()

productRouter.post("/create", productController.create)
productRouter.get("/:id", productController.getById)
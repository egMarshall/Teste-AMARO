export class Product {
    constructor(
        private id: string,
        private name: string,
        private tags: string[]
    ){}

    getId():string {
        return this.id
    }

    getName():string {
        return this.name
    }

    getTags():string[] {
        return this.tags
    }

    static toProductModel(product: any):Product {
        return new Product (
            product.id,
            product.name,
            product.tags
        )
    }
}

export interface ProductInputDTO {
    id?: number
    name: string,
    tags: string[]
}

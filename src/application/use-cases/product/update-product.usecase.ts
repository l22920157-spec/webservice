import type {ProductRepository} from "../../../domain/repositories/product.repository";

export class UpdateProductUseCase {
    constructor(private readonly repository: ProductRepository) {}

    async execute(code: string, data: any) {
        const existing = await this.repository.findByCode(code);

        if (!existing) {
            throw new Error("Product not found");
        }

        if (data.price && data.price < 0) {
            throw new Error("Invalid price");
        }

        if (data.stock && data.stock < 0) {
            throw new Error("Invalid stock");
        }

        await this.repository.update(code, data);

        return {
            success: true,
            message: "Product updated",
        };
    }
}
import type {ProductRepository} from "../../../domain/repositories/product.repository";

export class DeleteProductUseCase {
    constructor(private readonly repository: ProductRepository) {}

    async execute(code: string) {
        const existing = await this.repository.findByCode(code);

        if (!existing) {
            throw new Error("Product not found");
        }

        await this.repository.delete(code);

        return {
            success: true,
            message: "Product deleted",
        };
    }
}
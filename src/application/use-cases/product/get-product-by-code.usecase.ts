import type {ProductRepository} from "../../../domain/repositories/product.repository";

export class GetProductByCodeUseCase {
    constructor(private readonly repository: ProductRepository) {}

    async execute(code: string) {
        const product = await this.repository.findByCode(code);

        if (!product) {
            throw new Error("Product not found");
        }

        return {
            success: true,
            data: product,
        };
    }
}
import type {ProductRepository} from "../../../domain/repositories/product.repository";

export class GetAllProductsUseCase {
    constructor(private readonly repository: ProductRepository) {}

    async execute() {
        const products = await this.repository.findAll();

        return {
            success: true,
            data: products,
        };
    }
}
import { CreateProductUseCase } from "../use-cases/product/create-product.usecase";
import { GetAllProductsUseCase } from "../use-cases/product/get-all-products.usecase";
import { GetProductByCodeUseCase } from "../use-cases/product/get-product-by-code.usecase";
import { UpdateProductUseCase } from "../use-cases/product/update-product.usecase";
import { DeleteProductUseCase } from "../use-cases/product/delete-product.usecase";

import type { ProductRepository } from "../../domain/repositories/product.repository";
import type { Product } from "../../domain/entities/product.entity";
import type {CreateProductDTO} from "../dto/CreateProductDTO.ts";

export class ProductService {
    private createProduct: CreateProductUseCase;
    private getProducts: GetAllProductsUseCase;
    private getProductByCode: GetProductByCodeUseCase;
    private updateProduct: UpdateProductUseCase;
    private deleteProduct: DeleteProductUseCase;

    constructor(repository: ProductRepository) {
        this.createProduct = new CreateProductUseCase(repository);
        this.getProducts = new GetAllProductsUseCase(repository);
        this.getProductByCode = new GetProductByCodeUseCase(repository);
        this.updateProduct = new UpdateProductUseCase(repository);
        this.deleteProduct = new DeleteProductUseCase(repository);
    }

    async create(data: CreateProductDTO) {
        if (!data.description) {
            throw new Error("Description is required");
        }

        return this.createProduct.execute(data);
    }

    async findAll() {
        return this.getProducts.execute();
    }

    async findByCode(code: string) {
        if (!code) {
            throw new Error("Code is required");
        }

        return this.getProductByCode.execute(code);
    }

    async update(code: string, data: Partial<Product>) {
        if (!code) {
            throw new Error("Code is required");
        }

        return this.updateProduct.execute(code, data);
    }

    async delete(code: string) {
        if (!code) {
            throw new Error("Code is required");
        }

        return this.deleteProduct.execute(code);
    }
}
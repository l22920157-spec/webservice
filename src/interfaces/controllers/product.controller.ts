import { CreateProductUseCase } from "../../application/use-cases/product/create-product.usecase";
import { GetAllProductsUseCase } from "../../application/use-cases/product/get-all-products.usecase";
import { GetProductByCodeUseCase } from "../../application/use-cases/product/get-product-by-code.usecase";
import { UpdateProductUseCase } from "../../application/use-cases/product/update-product.usecase";
import { DeleteProductUseCase } from "../../application/use-cases/product/delete-product.usecase";
import type {CreateProductDTO} from "../../application/dto/CreateProductDTO.ts";


export class ProductController {
    constructor(
        private readonly createProduct: CreateProductUseCase,
        private readonly getAllProducts: GetAllProductsUseCase,
        private readonly getByCodeProduct: GetProductByCodeUseCase,
        private readonly updateProduct: UpdateProductUseCase,
        private readonly deleteProduct: DeleteProductUseCase
    ) {}

    async getAll() {
        try {
            return await this.getAllProducts.execute();
        } catch (error) {
            return this.handleError(error);
        }
    }

    async getByCode(code: string) {
        try {
            return await this.getByCodeProduct.execute(code);
        } catch (error) {
            return this.handleError(error);
        }
    }

    async create(dto: CreateProductDTO) {
        try {
            this.validateCreate(dto);
            return await this.createProduct.execute(dto);
        } catch (error) {
            return this.handleError(error);
        }

    }

    async update(code: string, data: any) {
        try {
            return await this.updateProduct.execute(code, data);
        } catch (error) {
            return this.handleError(error);
        }
    }

    async delete(code: string) {
        try {
            return await this.deleteProduct.execute(code);
        } catch (error) {
            return this.handleError(error);
        }
    }

    private validateCreate(data: any) {
        if (!data.description) throw new Error("Description is required");
        if (data.price == null || data.price < 0) throw new Error("Invalid price");
        if (data.stock == null || data.stock < 0) throw new Error("Invalid stock");
    }

    private handleError(error: any) {
        console.error(error);
        return {
            success: false,
            message: error.message || "Internal Server Error",
        };
    }
}
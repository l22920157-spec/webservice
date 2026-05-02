
import type {ProductRepository} from "../../../domain/repositories/product.repository";
import {type CreateProductDTO} from "../../dto/CreateProductDTO.ts";
import {ProductMapper} from "../../mapper/ProductMapper.ts";

export class CreateProductUseCase {
    constructor(private readonly repository: ProductRepository) {}

    async execute(dto: CreateProductDTO) {

        const product = ProductMapper.toDomain(dto);

        await this.repository.create(product);

        return {
            success: true,
            data: product,
        };
    }
}
import type {CreateProductDTO} from "../dto/CreateProductDTO.ts";
import {Product} from "../../domain/entities/product.entity.ts";

export class ProductMapper {
    static toDomain(dto: CreateProductDTO): Product {
        return new Product(
            dto.code,
            dto.description,
            dto.category,
            dto.price,
            dto.stock,
            dto.taxable
        );
    }
}
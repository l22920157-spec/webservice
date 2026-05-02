// infrastructure/mappers/ProductMapper.ts

import {Product} from "../../domain/entities/product.entity.ts";

export class ProductMapper {

    static toDomain(row: any): Product {
        return new Product(
            row.code,
            row.description,
            row.category,
            Number(row.price), // 🔥 importante
            row.stock,
            row.taxable
        );
    }

    static toPersistence(product: Product) {
        return {
            code: product.code,
            description: product.description,
            category: product.category,
            price: product.price.toString(), // 🔥 decimal → string
            stock: product.stock,
            taxable: product.taxable
        };
    }
}
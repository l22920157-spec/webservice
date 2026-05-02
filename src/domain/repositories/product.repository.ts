import { Product } from "../entities/product.entity.ts";
// src/domain/repositories/product.repository.ts
export interface ProductRepository {
    create(product: Product): Promise<Product>;
    findAll(): Promise<Product[]>;
    findByCode(code: string): Promise<Product | null>;
    update(code: string, data: Partial<Product>): Promise<Product>;
    delete(code: string): Promise<void>;
}
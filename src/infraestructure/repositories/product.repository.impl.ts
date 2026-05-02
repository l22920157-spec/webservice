import { eq } from "drizzle-orm";

import { db } from "../database/connection";
import { products } from "../database/schema";

import type { ProductRepository } from "../../domain/repositories/product.repository";
import { Product } from "../../domain/entities/product.entity";

export class ProductRepositoryImpl implements ProductRepository {

    async create(product: Product): Promise<Product> {
        if (!product.code) {
            throw new Error("Product code is required");
        }

        await db.insert(products).values({
            code: product.code,
            description: product.description,
            category: product.category,
            price: product.price.toString(), // ⚠️ decimal → string
            stock: product.stock,
            taxable: product.taxable,
        });

        return product;
    }

    async findAll(): Promise<Product[]> {
        const result = await db.select().from(products);

        return result.map(this.toDomain);
    }

    async findByCode(code: string): Promise<Product | null> {
        const [result] = await db
            .select()
            .from(products)
            .where(eq(products.code, code));

        return result ? this.toDomain(result) : null;
    }

    async update(code: string, data: Partial<Product>): Promise<Product> {
        const updateData: any = {};

        if (data.description !== undefined) updateData.description = data.description;
        if (data.category !== undefined) updateData.category = data.category;
        if (data.price !== undefined) updateData.price = data.price.toString();
        if (data.stock !== undefined) updateData.stock = data.stock;
        if (data.taxable !== undefined) updateData.taxable = data.taxable;

        await db
            .update(products)
            .set(updateData)
            .where(eq(products.code, code));

        const updated = await this.findByCode(code);

        if (!updated) {
            throw new Error("Product not found after update");
        }

        return updated;
    }

    async delete(code: string): Promise<void> {
        await db.delete(products).where(eq(products.code, code));
    }

    // 🔥 Mapper DB → Domain
    private toDomain(row: any): Product {
        return new Product(
            row.code,
            row.description,
            row.category,
            Number(row.price),
            row.stock,
            row.taxable
        );
    }
}
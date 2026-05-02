import { eq } from "drizzle-orm";

import { db } from "../database/connection";
import { customers, orders } from "../database/schema";

import type { CustomerRepository } from "../../domain/repositories/customer.repository";
import type { Customer } from "../../domain/entities/customer.entity";

export class CustomerRepositoryImpl implements CustomerRepository {

    async create(customer: Customer): Promise<Customer> {
        const [result] = await db.insert(customers).values({
            id: customer.id,
            name: customer.name,
            email: customer.email,
        });

        return {
            ...customer
        };
    }

    async findAll(): Promise<Customer[]> {
        const rawData = await db
            .select()
            .from(customers)
            .leftJoin(orders, eq(customers.id, orders.customerId));

        // Agrupar filas
        const grouped = rawData.reduce<Record<string, any>>((acc, row) => {
            const customer = row.customers;
            const order = row.orders;

            if (!acc[customer.id]) {
                acc[customer.id] = { ...customer, orders: [] };
            }

            if (order) {
                acc[customer.id].orders.push(order);
            }

            return acc;
        }, {});

        return Object.values(grouped).map(c => this.toDomain(c));
    }

    async findById(id: string): Promise<Customer | null> {
        const rawData = await db
            .select()
            .from(customers)
            .leftJoin(orders, eq(customers.id, orders.customerId))
            .where(eq(customers.id, id));

        if (rawData.length === 0) return null;

        const customer = rawData[0]!.customers;
        const customerOrders = rawData
            .filter(row => row.orders != null)
            .map(row => row.orders!);

        return this.toDomain({ ...customer, orders: customerOrders });
    }

    async update(id: string, data: Partial<Customer>): Promise<Customer> {
        await db
            .update(customers)
            .set({
                name: data.name,
                email: data.email,
            })
            .where(eq(customers.id, id));

        const updated = await this.findById(id);

        if (!updated) {
            throw new Error("Customer not found after update");
        }

        return updated;
    }

    async delete(id: string): Promise<void> {
        await db.delete(customers).where(eq(customers.id, id));
    }

    // 🔥 Mapper DB → Domain
    private toDomain(row: any): Customer {
        // Mapea las órdenes si existen, formándolas como historial
        const history = row.orders 
            ? row.orders.map((o: any) => `Order ID: ${o.id}`) 
            : [];

        return {
            id: row.id,
            name: row.name,
            email: row.email,
            purchaseHistory: history,
        };
    }
}
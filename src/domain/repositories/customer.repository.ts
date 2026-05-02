// src/domain/repositories/customer.repository.ts
import type { Customer } from "../entities/customer.entity";

export interface CustomerRepository {
    create(customer: Customer): Promise<Customer>;
    findAll(): Promise<Customer[]>;
    findById(id: string): Promise<Customer | null>;
    update(id: string, data: Partial<Customer>): Promise<Customer>;
    delete(id: string): Promise<void>;
}
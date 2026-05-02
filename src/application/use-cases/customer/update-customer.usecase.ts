import type { CustomerRepository } from "../../../domain/repositories/customer.repository";
import type { Customer } from "../../../domain/entities/customer.entity";

export class UpdateCustomerUseCase {
    constructor(private repository: CustomerRepository) {}

    async execute(id: string, data: Partial<Customer>) {
        if (!id) {
            throw new Error("Customer id is required");
        }

        const existing = await this.repository.findById(id);

        if (!existing) {
            throw new Error("Customer not found");
        }

        return this.repository.update(id, data);
    }
}
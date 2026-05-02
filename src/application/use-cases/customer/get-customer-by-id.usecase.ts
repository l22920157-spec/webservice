import type { CustomerRepository } from "../../../domain/repositories/customer.repository";

export class GetCustomerByIdUseCase {
    constructor(private repository: CustomerRepository) {}

    async execute(id: string) {
        if (!id) {
            throw new Error("Customer id is required");
        }

        const customer = await this.repository.findById(id);

        if (!customer) {
            throw new Error("Customer not found");
        }

        return customer;
    }
}
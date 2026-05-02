import type { CustomerRepository } from "../../../domain/repositories/customer.repository";

export class GetCustomersUseCase {
    constructor(private repository: CustomerRepository) {}

    async execute() {
        return this.repository.findAll();
    }
}
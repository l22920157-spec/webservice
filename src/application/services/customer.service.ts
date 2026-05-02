import { CreateCustomerUseCase } from "../use-cases/customer/create-customer.usecase";
import { GetCustomersUseCase } from "../use-cases/customer/get-customers.usecase";
import { GetCustomerByIdUseCase } from "../use-cases/customer/get-customer-by-id.usecase";
import { UpdateCustomerUseCase } from "../use-cases/customer/update-customer.usecase";
import { DeleteCustomerUseCase } from "../use-cases/customer/delete-customer.usecase";

import type { CustomerRepository } from "../../domain/repositories/customer.repository";
import type { Customer } from "../../domain/entities/customer.entity";

export class CustomerService {
    private createCustomer: CreateCustomerUseCase;
    private getCustomers: GetCustomersUseCase;
    private getCustomerById: GetCustomerByIdUseCase;
    private updateCustomer: UpdateCustomerUseCase;
    private deleteCustomer: DeleteCustomerUseCase;

    constructor(repository: CustomerRepository) {
        this.createCustomer = new CreateCustomerUseCase(repository);
        this.getCustomers = new GetCustomersUseCase(repository);
        this.getCustomerById = new GetCustomerByIdUseCase(repository);
        this.updateCustomer = new UpdateCustomerUseCase(repository);
        this.deleteCustomer = new DeleteCustomerUseCase(repository);
    }

    async create(data: Customer) {
        if (!data.name) {
            throw new Error("Name is required");
        }

        if (!data.email) {
            throw new Error("Email is required");
        }

        return this.createCustomer.execute(data);
    }

    async findAll() {
        return this.getCustomers.execute();
    }

    async findById(id: string) {
        if (!id) {
            throw new Error("Id is required");
        }

        return this.getCustomerById.execute(id);
    }

    async update(id: string, data: Partial<Customer>) {
        if (!id) {
            throw new Error("Id is required");
        }

        return this.updateCustomer.execute(id, data);
    }

    async delete(id: string) {
        if (!id) {
            throw new Error("Id is required");
        }

        return this.deleteCustomer.execute(id);
    }
}
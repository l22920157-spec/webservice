import { CreateCustomerUseCase } from "../../application/use-cases/customer/create-customer.usecase";
import { GetCustomersUseCase } from "../../application/use-cases/customer/get-customers.usecase";
import { GetCustomerByIdUseCase } from "../../application/use-cases/customer/get-customer-by-id.usecase";
import { UpdateCustomerUseCase } from "../../application/use-cases/customer/update-customer.usecase";
import { DeleteCustomerUseCase } from "../../application/use-cases/customer/delete-customer.usecase";
import type { CreateCustomerDTO } from "../../application/dto/CreateCustomerDTO";

export class CustomerController {
    constructor(
        private readonly createCustomer: CreateCustomerUseCase,
        private readonly getCustomers: GetCustomersUseCase,
        private readonly getCustomerById: GetCustomerByIdUseCase,
        private readonly updateCustomer: UpdateCustomerUseCase,
        private readonly deleteCustomer: DeleteCustomerUseCase
    ) {}

    async getAll() {
        try {
            return await this.getCustomers.execute();
        } catch (error) {
            return this.handleError(error);
        }
    }

    async getById(id: string) {
        try {
            return await this.getCustomerById.execute(id);
        } catch (error) {
            return this.handleError(error);
        }
    }

    async create(dto: CreateCustomerDTO) {
        try {
            this.validateCreate(dto);
            return await this.createCustomer.execute({
                id: dto.id,
                name: dto.name,
                email: dto.email,
                purchaseHistory: dto.purchaseHistory || []
            });
        } catch (error) {
            return this.handleError(error);
        }
    }

    async update(id: string, data: any) {
        try {
            return await this.updateCustomer.execute(id, data);
        } catch (error) {
            return this.handleError(error);
        }
    }

    async delete(id: string) {
        try {
            return await this.deleteCustomer.execute(id);
        } catch (error) {
            return this.handleError(error);
        }
    }

    private validateCreate(data: any) {
        if (!data.name) throw new Error("Name is required");
        if (!data.email) throw new Error("Email is required");
    }

    private handleError(error: any) {
        console.error(error);
        return {
            success: false,
            message: error.message || "Internal Server Error",
        };
    }
}

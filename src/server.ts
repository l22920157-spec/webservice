import { Elysia } from "elysia";
import { productRoutes } from "./interfaces/routes/product.routes";
import { ProductController } from "./interfaces/controllers/product.controller";
import { customerRoutes } from "./interfaces/routes/customer.routes";
import { CustomerController } from "./interfaces/controllers/customer.controller";

// repo
import { ProductRepositoryImpl } from "./infraestructure/repositories/product.repository.impl";
import { CustomerRepositoryImpl } from "./infraestructure/repositories/customer.repository.impl";


// use cases
import { GetAllProductsUseCase } from "./application/use-cases/product/get-all-products.usecase";
import { GetProductByCodeUseCase } from "./application/use-cases/product/get-product-by-code.usecase";
import { CreateProductUseCase } from "./application/use-cases/product/create-product.usecase";
import { UpdateProductUseCase } from "./application/use-cases/product/update-product.usecase";
import { DeleteProductUseCase } from "./application/use-cases/product/delete-product.usecase";

import { GetCustomersUseCase } from "./application/use-cases/customer/get-customers.usecase";
import { GetCustomerByIdUseCase } from "./application/use-cases/customer/get-customer-by-id.usecase";
import { CreateCustomerUseCase } from "./application/use-cases/customer/create-customer.usecase";
import { UpdateCustomerUseCase } from "./application/use-cases/customer/update-customer.usecase";
import { DeleteCustomerUseCase } from "./application/use-cases/customer/delete-customer.usecase";


const server = new Elysia();

// 🔹 Repository
const productRepository = new ProductRepositoryImpl();
const customerRepository = new CustomerRepositoryImpl();

// 🔹 UseCases
const getAllProducts = new GetAllProductsUseCase(productRepository);
const getByCodeProduct = new GetProductByCodeUseCase(productRepository);
const createProduct = new CreateProductUseCase(productRepository);
const updateProduct = new UpdateProductUseCase(productRepository);
const deleteProduct = new DeleteProductUseCase(productRepository);

const getCustomers = new GetCustomersUseCase(customerRepository);
const getCustomerById = new GetCustomerByIdUseCase(customerRepository);
const createCustomer = new CreateCustomerUseCase(customerRepository);
const updateCustomer = new UpdateCustomerUseCase(customerRepository);
const deleteCustomer = new DeleteCustomerUseCase(customerRepository);


// 🔹 Controller (YA CON DEPENDENCIAS)
const productController = new ProductController(
    createProduct,
    getAllProducts,
    getByCodeProduct,
    updateProduct,
    deleteProduct
);

const customerController = new CustomerController(
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
);

// 🔹 Routes
server.use((app) =>
    productRoutes(app, productController));
server.use((app) =>
    customerRoutes(app, customerController));


server.listen(3000);

console.log("Server running on http://localhost:3000");
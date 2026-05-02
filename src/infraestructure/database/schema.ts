
import { mysqlTable, varchar, boolean, int, decimal, bigint, timestamp } from "drizzle-orm/mysql-core";
import {relations} from "drizzle-orm";

export const products = mysqlTable("products", {
    code: varchar("code", { length: 50 }).primaryKey(),
    description: varchar("description", { length: 255 }).notNull(),
    category: varchar("category", { length: 200 }).notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    stock: int("stock").notNull(),
    taxable: boolean("taxable").notNull()
});

export const customers = mysqlTable("customers", {
    id: varchar("id", { length: 50 }).primaryKey(),
    name: varchar("name", { length: 200 }).notNull(),
    email: varchar("email", { length: 200 }).notNull()
});


export const orders = mysqlTable("orders", {
    id: bigint("id", { mode: "number" }).autoincrement().primaryKey(),

    customerId: varchar("customer_id", { length: 50 }),

    createdAt: timestamp("created_at").defaultNow(),
});


export const orderDetails = mysqlTable("order_details", {
    id: bigint("id", { mode: "number" }).autoincrement().primaryKey(),

    orderId: bigint("order_id", { mode: "number" }).notNull(),

    productCode: varchar("product_code", { length: 50 }).notNull(),

    quantity: int("quantity").notNull(),

    unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
});

//--- relaciones
// customers → orders
export const customersRelations = relations(customers, ({ many }) => ({
    orders: many(orders),
}));

// orders → customer + orderDetails
export const ordersRelations = relations(orders, ({ one, many }) => ({
    customer: one(customers, {
        fields: [orders.customerId],
        references: [customers.id],
    }),

    details: many(orderDetails),
}));

// order_details → order + product
export const orderDetailsRelations = relations(orderDetails, ({ one }) => ({
    order: one(orders, {
        fields: [orderDetails.orderId],
        references: [orders.id],
    }),

    product: one(products, {
        fields: [orderDetails.productCode],
        references: [products.code],
    }),
}));

// products → order_details
export const productsRelations = relations(products, ({ many }) => ({
    orderDetails: many(orderDetails),
}));
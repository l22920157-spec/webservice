import { t } from "elysia";

export const CreateCustomerSchema = t.Object({
    id: t.String(),
    name: t.String({ minLength: 1 }),
    email: t.String({ format: "email" }),
    purchaseHistory: t.Optional(t.Array(t.String())),
});

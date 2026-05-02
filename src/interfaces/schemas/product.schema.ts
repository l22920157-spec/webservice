import { t } from "elysia";

export const CreateProductSchema = t.Object({
    code: t.String(),
    description: t.String({ minLength: 1 }),
    category: t.String({ minLength: 1 }),
    price: t.Number({ minimum: 0 }),
    stock: t.Number({ minimum: 0 }),
    taxable: t.Boolean(),
});

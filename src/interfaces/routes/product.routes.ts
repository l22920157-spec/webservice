import type {Elysia} from "elysia";
import type {ProductController} from "../controllers/product.controller.ts";
import { CreateProductSchema } from "../schemas/product.schema.ts";


export const productRoutes = (
    app: Elysia,
    controller: ProductController
) => {
    return app.group("/products", (app) =>
        app
            .get("/", () => controller.getAll())
            .get("/:code", ({ params }) => controller.getByCode(params.code))
            .post(
                "/",
                ({ body }) => controller.create(body),
                {
                    body: CreateProductSchema
                }
            )
            .put("/:code", ({ params, body }) =>
                controller.update(params.code, body)
            )
            .delete("/:code", ({ params }) =>
                controller.delete(params.code)
            )
    );
};
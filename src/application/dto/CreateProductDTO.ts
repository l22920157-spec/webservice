// application/mappers/ProductMapper.ts

import { CreateProductSchema } from "../../interfaces/schemas/product.schema";

export type CreateProductDTO = typeof CreateProductSchema.static;
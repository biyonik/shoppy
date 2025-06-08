"use server";

import { get } from "@/common/utils/fetch";
import { ProductEntity } from "../interfaces/product.interface";

export default async function getProducts() {
    return await get<ProductEntity[]>('products', ['products']);
}
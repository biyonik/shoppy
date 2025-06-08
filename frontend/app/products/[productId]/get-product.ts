"use server";

import { get } from "@/common/utils/fetch";
import { ProductEntity } from "../interfaces/product.interface";

export default async function getProduct(productId: string) {
    return await get<ProductEntity>(`products/${productId}`);
}
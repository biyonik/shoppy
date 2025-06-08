"use server";

import { post } from "@/common/utils/fetch";

export default async function checkout(productId: string) {
    const param: Record<string, any> = {"productId": productId}
    return await post('checkout/session', param);
}
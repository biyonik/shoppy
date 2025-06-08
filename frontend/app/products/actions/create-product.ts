"use server";

import { API_URL } from "@/common/constants/api";
import { getHeaders, post, uploadFile } from "@/common/utils/fetch";
import { revalidateTag } from "next/cache";

export default async function createProduct(
    formData: FormData,
    imageFile?: File | null
) {

    const response = await post('products', formData);
    if (imageFile && imageFile.size > 0 && !response.error) {
        console.log('response: ', response.data);
        await uploadProductImage(response.data.id, imageFile);
    }
    revalidateTag("products");
    return response;
}

async function uploadProductImage(productId: string, file: File) {
    const formData = new FormData();
    formData.append("image", file);

    console.log('Uploading to:', `${API_URL}/products/${productId}/image`);
    console.log('File size:', file.size);
    console.log('File type:', file.type);

    const headers = await getHeaders();
    console.log('Upload headers:', headers);

    const result = await uploadFile(`products/${productId}/image`, formData);
    return result;
}
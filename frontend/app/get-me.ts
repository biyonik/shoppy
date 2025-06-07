"use server";

import { get } from "@/common/utils/fetch";


export default async function getMe() {
    return await get('users/me');
}
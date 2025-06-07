"use server";

import { get } from "@/utils/fetch";


export default async function getMe() {
    return await get('users/me');
}
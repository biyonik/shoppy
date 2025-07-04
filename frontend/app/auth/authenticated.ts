import { cookies } from "next/headers";
import { AUTHENTICATION_COOKIE } from "./auth-cookie";

export default async function authenticated() {
    const cookieStore = await cookies();
    return !!cookieStore.get(AUTHENTICATION_COOKIE)?.value;
}
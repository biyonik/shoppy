"use server";

import { API_URL } from "@/common/constants/api";
import { FormError } from "@/common/interfaces/form-error.interface";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {jwtDecode} from 'jwt-decode';
import { AUTHENTICATION_COOKIE } from "../auth-cookie";

export async function loginUser(
    _prevState: FormError,
    formData: FormData
) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    });
    
    if (!res.ok) {
        return { error: 'Login failed' };
    }
    
    await setAuthCookie(res);
    
    redirect('/');
}

const setAuthCookie = async (res: Response) => {
    const setCookieHeader = res.headers.get('Set-Cookie');
    if (setCookieHeader) {
        const authCookie = setCookieHeader
            .split(',')
            .find(cookie => cookie.trim().startsWith('Authentication='));
            
        if (authCookie) {
            const token = authCookie.split(';')[0].split('=')[1];
            
            const cookieStore = await cookies();
            cookieStore.set(AUTHENTICATION_COOKIE, token, {
                secure: true,
                httpOnly: true,
                sameSite: 'lax',
                maxAge: 60 * 60 * 10,
                path: '/',
                expires: new Date(jwtDecode(token).exp! * 1000)
            });
        }
    }
}
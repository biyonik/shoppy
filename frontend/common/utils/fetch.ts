import { API_URL } from "@/common/constants/api";
import { getErrorMessage } from "./error";
import { cookies } from "next/headers";

// Tüm cookie'leri string formatında döndür
const getCookieHeader = async (): Promise<string> => {
    const cookieStore = await cookies();
    
    return cookieStore.getAll()
        .map(cookie => `${cookie.name}=${cookie.value}`)
        .join('; ');
}

// Ortak headers oluştur
const getHeaders = async (additionalHeaders: Record<string, string> = {}) => {
    const cookieString = await getCookieHeader();
    
    return {
        'Content-Type': 'application/json',
        ...(cookieString && { Cookie: cookieString }),
        ...additionalHeaders
    };
}

// Base fetch fonksiyonu
const fetchWithAuth = async (
    path: string, 
    options: RequestInit = {}
): Promise<Response> => {
    const headers = await getHeaders(options.headers as Record<string, string>);
    
    return fetch(`${API_URL}/${path}`, {
        ...options,
        headers
    });
}

// POST metodu (FormData veya JSON destekli)
export const post = async (
    path: string, 
    data: FormData | Record<string, any>,
    additionalHeaders: Record<string, string> = {}
) => {
    let body: string | FormData;
    let headers = additionalHeaders;
    
    if (data instanceof FormData) {
        body = data;
        delete headers['Content-Type'];
    } else {
        // Object ise JSON'a çevir
        body = JSON.stringify(data);
        headers['Content-Type'] = 'application/json';
    }
    
    const res = await fetchWithAuth(path, {
        method: 'POST',
        headers,
        body
    });
    
    const parsedResponse = await res.json();
    
    if (!res.ok) {
        return { error: getErrorMessage(parsedResponse) };
    }
    
    return { data: parsedResponse, error: null };
}

// GET metodu
export const get = async (path: string) => {
    const res = await fetchWithAuth(path, {
        method: 'GET'
    });
    
    if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }
    
    return res.json();
}

// PUT metodu
export const put = async (
    path: string, 
    data: FormData | Record<string, any>
) => {
    let body: string | FormData;
    let headers: Record<string, string> = {};
    
    if (data instanceof FormData) {
        body = data;
    } else {
        body = JSON.stringify(data);
        headers['Content-Type'] = 'application/json';
    }
    
    const res = await fetchWithAuth(path, {
        method: 'PUT',
        headers,
        body
    });
    
    const parsedResponse = await res.json();
    
    if (!res.ok) {
        return { error: getErrorMessage(parsedResponse) };
    }
    
    return { data: parsedResponse, error: null };
}

// DELETE metodu
export const del = async (path: string) => {
    const res = await fetchWithAuth(path, {
        method: 'DELETE'
    });
    
    if (!res.ok) {
        const parsedResponse = await res.json();
        return { error: getErrorMessage(parsedResponse) };
    }
    
    return { error: null };
}

// Dosya upload için özel metod
export const uploadFile = async (path: string, formData: FormData) => {
    const cookieString = await getCookieHeader();
    
    const res = await fetch(`${API_URL}/${path}`, {
        method: 'POST',
        headers: {
            ...(cookieString && { Cookie: cookieString })
        },
        body: formData
    });
    
    const parsedResponse = await res.json();
    
    if (!res.ok) {
        return { error: getErrorMessage(parsedResponse) };
    }
    
    return { data: parsedResponse, error: null };
}
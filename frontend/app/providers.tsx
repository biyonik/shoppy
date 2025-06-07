"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import darkTheme from "./dark.theme";
import React from "react";
import AuthContext from "@/app/contexts/auth-context";
import { ThemeProvider } from "@mui/material";

interface ProviderProps {
    children?: Readonly<React.ReactNode>,
    authenticated: boolean
}

export default function Providers({children, authenticated}: ProviderProps) {
    
    return (
        <AppRouterCacheProvider>
            <ThemeProvider theme={darkTheme}>
                <AuthContext.Provider value={authenticated}>
                    {children}
                </AuthContext.Provider>
            </ThemeProvider>
        </AppRouterCacheProvider>
    )
}
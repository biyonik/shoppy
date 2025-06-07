"use client";

import { createContext, useContext } from "react";

const AuthContext = createContext<boolean>(false);

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export default AuthContext;
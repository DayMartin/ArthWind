import { ReactNode } from "react";

export interface IAuthContextData {
    handleLogin: (email: string, senha: string) => Promise<string | void>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean; 
    type: string | null;
    id: number | null;
    name: string | null;
  }

export interface IAuthProviderProps {
    children: React.ReactNode;
}

export interface ProtectedRouteProps {
    children: ReactNode;
}

export interface IAuth {
    token: string; 
    id: string;
    type: string;
    fullName: string;
  
}


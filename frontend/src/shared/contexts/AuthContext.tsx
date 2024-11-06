
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AuthService } from '../services/auth/AuthService'; 
import { useRouter } from 'next/router';
import { IAuthContextData } from '../interfaces/AuthInterface';

const AuthContext = createContext<IAuthContextData | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [fullName, setName] = useState<string | null>(null);

  const [id, setId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true); 
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('APP_ACCESS_TOKEN');
    const storedType = localStorage.getItem('APP_ACCESS_USER_TYPE');
    const storedId = localStorage.getItem('APP_ACCESS_USER_ID');
    const storedName = typeof window !== 'undefined' ? localStorage.getItem('APP_ACCESS_USER_NAME') : null;

    if (storedToken) setToken(JSON.parse(storedToken));
    if (storedType) setType(JSON.parse(storedType));
    if (storedId) setId(JSON.parse(storedId));
    if (storedName) setName(storedName);

    setIsLoading(false);
  }, []);

  const handleLogin = useCallback(async (email: string, senha: string) => {
    setIsLoading(true);
    const result = await AuthService.auth(email, senha);
    if (result instanceof Error) {
      setIsLoading(false);
      alert(result.message)
      return result.message;
    } else {
      localStorage.setItem('APP_ACCESS_TOKEN', JSON.stringify(result.token));
      const payload = JSON.parse(atob(result.token.split('.')[1]));
      if (payload.type) localStorage.setItem('APP_ACCESS_USER_TYPE', JSON.stringify(payload.type));
      if (payload.id) localStorage.setItem('APP_ACCESS_USER_ID', JSON.stringify(payload.id));
      if (payload.fullName) localStorage.setItem('APP_ACCESS_USER_NAME', JSON.stringify(payload.fullName));

      setToken(result.token);
      setType(payload.type || null);
      setId(payload.id || null);
      setIsLoading(false);
      setName(payload.fullName || null)
      router.push('/');
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('APP_ACCESS_TOKEN');
    localStorage.removeItem('APP_ACCESS_USER_TYPE');
    localStorage.removeItem('APP_ACCESS_USER_ID');
    localStorage.removeItem('APP_ACCESS_USER_NAME');

    setToken(null);
    setType(null);
    setId(null);
    router.push("/login/Login");

  }, []);

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ handleLogin, logout, isAuthenticated, isLoading, type: type, id, name: fullName }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): IAuthContextData => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext deve ser usado dentro de um AuthProvider');
  }
  return context;
};

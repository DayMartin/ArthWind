import { Api } from "../api/axios-config";
import { IAuth } from "@/shared/interfaces/AuthInterface";


const auth = async (email: string, senha: string): Promise<IAuth | Error> => {
  try {
    const { data } = await Api.post('/auth/login', { email, senha }); 

    if (data && data.token) { 
      localStorage.setItem('APP_ACCESS_TOKEN', data.token);
      localStorage.setItem('APP_ACCESS_USER_ID', data.id);
      localStorage.setItem('APP_ACCESS_USER_TYPE', data.type);

      return { token: data.token, id: data.id, type: data.type};
    }

    return new Error('Erro no login.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro no login.');
  }
};

export const AuthService = {
  auth,
};

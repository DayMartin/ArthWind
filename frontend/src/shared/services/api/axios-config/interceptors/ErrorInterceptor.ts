import { AxiosError } from "axios";

export const errorInterceptor = (error: AxiosError) => {
  if (error.message === 'Network Error') {
    console.error("Erro de conexão:", error.message);
    return Promise.reject(new Error('Erro de conexão. Verifique sua internet.'));
  } else if (error.response) {
    const status = error.response.status;

    if (status === 401) {
      console.error("Erro 401:", error.response.data);
      return Promise.reject(new Error('Erro 401: Não autorizado.'));
    } else if (status === 403) {
      console.error("Erro 403:", error.response.data);
      return Promise.reject(new Error('Erro 403: Acesso negado.'));
    } else if (status === 404) {
      console.error("Erro 404:", error.response.data);
      return Promise.reject(new Error('Erro 404: Recurso não encontrado.'));
    } else if (status === 422) {
      alert("Erro 422: Por favor, verifique os dados enviados!");
      return Promise.reject(new Error('Erro 422: Por favor, verifique os dados enviados.'));
    } else if (status === 400) {
      alert("Erro 400: Solicitação inválida!");
      return Promise.reject(new Error('Erro 400: Solicitação inválida.'));
    } else if (status === 409) {
      alert("Erro 409: E-mail já cadastrado!");
      return Promise.reject(new Error('Erro 400: E-mail já cadastrado.'));
    } else {
      alert("Erro inesperado");
      return Promise.reject(new Error('Erro inesperado'));
    }
  } else {
    console.error("Erro inesperado:", error.message);
    return Promise.reject(new Error('Erro inesperado. Por favor, tente novamente.'));
  }

  return Promise.reject(error);
};

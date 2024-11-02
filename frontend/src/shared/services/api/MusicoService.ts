import { Environment } from '@/shared/environment';
import { Api } from './axios-config';
import { MusicoCreate, MusicoDetalhe, ApiResponseMusico } from '@/shared/interfaces/MusicoInterface';


const findAll = async (page = 1, filterId = '', filterName = ''): Promise<ApiResponseMusico | Error> => {
  try {
    const urlRelativa = `${Environment.URL_BASE}/musicos/all?page=${page}&filterId=${filterId}&filterName=${filterName}`;
    const { data } = await Api.get(urlRelativa);

    if (data) {
      return data;
    }

    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};


const getUsers = async (): Promise<MusicoDetalhe[] | Error> => {
  try {
    const urlRelativa = `${Environment.URL_BASE}/user/list`;
    const { data } = await Api.get<MusicoDetalhe[]>(urlRelativa);

    if (data) {
      return data;
    }

    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const getUsersList = async (page = 1, filterId = '', filterName = ''): Promise<ApiResponseMusico | Error> => {
  try {
    const urlRelativa = `${Environment.URL_BASE}/user/getAlltipoList?page=${page}&id=${filterId}&nome=${filterName}`;

    const { data } = await Api.get<ApiResponseMusico>(urlRelativa);

    if (data) {
      return data;
    }

    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

// const getByEmail = async (email: string): Promise<MusicoDetalhe | Error> => {
//   try {
//     const { data } = await Api.get(`/auth/register/email?email=${email}`); 

//     if (data) {
//       return data;
//     }

//     return new Error('Erro ao consultar o registro.');
//   } catch (error) {
//     console.error(error);
//     return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
//   }
// };

const create = async (dados: MusicoCreate): Promise<any> => {
  console.log('dados', dados)
  try {
    const response = await Api.post<MusicoCreate>('/musicos/create', dados);
    return response.data;
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};


const updateById = async (id: string, dados: MusicoDetalhe): Promise<void | Error> => {
  try {
    await Api.put(`user/edit/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (id: string): Promise<void | Error> => {
  try {
    await Api.delete(`/user/delete/${id}`); 
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
  }
};

const ativarById = async (id: string): Promise<void | Error> => {
  try {
    await Api.put(`/user/ativar/${id}`); 
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao ativar o usuário.');
  }
};

const getByID = async (id: number): Promise<MusicoDetalhe | Error> => {
  try {
    const urlRelativa = `${Environment.URL_BASE}/user/get`;
    // Envie o id dentro de um objeto
    const { data } = await Api.post(urlRelativa, { id });

    if (data) {
      return data;
    }

    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};


export const MusicoService = {
  getUsersList,
  create,
  updateById,
  deleteById,
  // getByEmail,
  ativarById,
  getUsers,
  findAll,
  getByID
};
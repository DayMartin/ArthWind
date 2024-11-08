import { Environment } from '@/shared/environment';
import { Api } from './axios-config';
import { MusicoCreate, MusicoDetalhe, ApiResponseMusico, MusicoUpdate } from '@/shared/interfaces/MusicoInterface';


const findAllMusicos = async (page = 1, limit = 1, filterName = ''): Promise<ApiResponseMusico | Error> => {
  try {
    const urlRelativa = `${Environment.URL_BASE}/musicos/all?page=${page}&limit=${limit}&nome=${filterName}`;
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

const findListMusicos = async (): Promise<MusicoDetalhe[] | Error> => {
  try {
    const urlRelativa = `${Environment.URL_BASE}/musicos/list`;
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

const create = async (dados: MusicoCreate): Promise<any> => {
  try {
    const response = await Api.post<MusicoCreate>('/musicos/create', dados);
    return response.data;
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};

const updateMusico = async (id: number, dados: MusicoUpdate): Promise<void | Error> => {
  try {
    await Api.put(`musicos/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
  }
};

const updateStatus = async (id: number, status: string): Promise<void | Error> => {
  try {
    await Api.patch(`/musicos/${id}/status`, { status });
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o status.');
  }
};

const findOneMusico = async (id: number): Promise<MusicoDetalhe | Error> => {
  try {
    const urlRelativa = `${Environment.URL_BASE}/musicos/${id}`;
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

export const MusicoService = {
  create,
  updateMusico,
  updateStatus,
  findListMusicos,
  findAllMusicos,
  findOneMusico
};
import { Environment } from '@/shared/environment';
import { Api } from './axios-config';
import { InstrumentoCreate, InstrumentoDetalhe, ApiResponseInstrumento } from '@/shared/interfaces/InstrumentoInterface';


const findAllInstrumentos = async (page = 1, limit = 1, filterName = ''): Promise<ApiResponseInstrumento | Error> => {
  try {
    const urlRelativa = `${Environment.URL_BASE}/instrumentos/all?page=${page}&limit=${limit}&nome=${filterName}`;
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

const findListInstrumentos = async (): Promise<InstrumentoDetalhe[] | Error> => {
  try {
    const urlRelativa = `${Environment.URL_BASE}/instrumentos/list`;
    const { data } = await Api.get<InstrumentoDetalhe[]>(urlRelativa);

    if (data) {
      return data;
    }

    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const create = async (dados: InstrumentoCreate): Promise<any> => {
  try {
    const response = await Api.post<InstrumentoCreate>('/instrumentos', dados);
    return response.data;
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};

const updateInstrumento = async (id: number, dados: InstrumentoDetalhe): Promise<void | Error> => {
  try {
    await Api.put(`instrumentos/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
  }
};


const findOneInstrumento = async (id: number): Promise<InstrumentoDetalhe | Error> => {
  try {
    const urlRelativa = `${Environment.URL_BASE}/instrumentos/${id}`;
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

const deleteInstrumento = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`instrumentos/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao excluir o registro.');
  }
};


export const InstrumentoService = {
  create,
  updateInstrumento,
  findListInstrumentos,
  findAllInstrumentos,
  findOneInstrumento,
  deleteInstrumento
};
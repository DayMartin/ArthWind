import { Environment } from '@/shared/environment';
import { Api } from './axios-config';
import { EventCreate, EventDetalhe } from '@/shared/interfaces/EventoInterface';

const findListEvento = async (): Promise<EventDetalhe[] | Error> => {
  try {
    const urlRelativa = `${Environment.URL_BASE}/eventos/all`;
    const { data } = await Api.get<EventDetalhe[]>(urlRelativa);

    if (data) {
      return data;
    }

    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const create = async (dados: EventCreate): Promise<any> => {
  try {
    const response = await Api.post<EventCreate>('/eventos', dados);
    return response.data;
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};

const updateEvento = async (id: number, dados: EventDetalhe): Promise<void | Error> => {
  try {
    await Api.put(`eventos/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
  }
};


const findOneEvento = async (id: number): Promise<EventDetalhe | Error> => {
  try {
    const urlRelativa = `${Environment.URL_BASE}/eventos/${id}`;
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

const deleteEvento = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`eventos/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao excluir o registro.');
  }
};


export const EventoService = {
  create,
  updateEvento,
  findListEvento,
  findOneEvento,
  deleteEvento
};
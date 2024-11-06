import { Environment } from '@/shared/environment';
import { Api } from './axios-config';
import { EventoMusicoCreate, EventoMusicoDetalhe } from '@/shared/interfaces/EventoMusico';

const create = async (dados: EventoMusicoCreate): Promise<any> => {
  try {
    const response = await Api.post<EventoMusicoCreate>('/evento_musico', dados);
    return response.data;
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};

const findEventoByMusico = async (musicoID: number): Promise<EventoMusicoDetalhe[] | Error> => {
  try {
    const urlRelativa = `${Environment.URL_BASE}/evento_musico/musico/${musicoID}`;
    const { data } = await Api.get<EventoMusicoDetalhe[]>(urlRelativa);

    if (data) {
      return data;
    }

    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const findEventoById = async (musicoID: number): Promise<EventoMusicoDetalhe[]> => {
  try {
    const urlRelativa = `${Environment.URL_BASE}/evento_musico/evento/${musicoID}`;
    const { data } = await Api.get<EventoMusicoDetalhe[]>(urlRelativa);

    if (data) {
      return data;
    } else {
      // Caso os dados não sejam válidos, lança um erro com uma mensagem clara
      throw new Error('Erro ao listar os registros. Dados inválidos.');
    }
  } catch (error) {
    console.error(error);
    // Lança o erro com a mensagem caso aconteça uma falha
    throw new Error((error as Error).message || 'Erro ao listar os registros.');
  }
};

const deleteMusicoEvento = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`evento_musico/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao excluir o registro.');
  }
};


export const EventoMusico = {
  create,
  findEventoByMusico,
  deleteMusicoEvento,
  findEventoById
}
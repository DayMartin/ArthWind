import { Environment } from '@/shared/environment';
import { Api } from './axios-config';
import { MusicoInstrumentoCompleto, MusicoInstrumentoCreate, MusicoInstrumentoDetalhe } from '@/shared/interfaces/MusicoInstrumentoInterface';

const create = async (dados: MusicoInstrumentoCreate): Promise<any> => {
  try {
    const response = await Api.post<MusicoInstrumentoCreate>('/musico_instrumento', dados);
    return response.data;
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};

const findInstrumentosByMusico = async (musicoID: number): Promise<MusicoInstrumentoDetalhe[] | Error> => {
  try {
    const urlRelativa = `${Environment.URL_BASE}/musico_instrumento/musico/${musicoID}`;
    const { data } = await Api.get<MusicoInstrumentoDetalhe[]>(urlRelativa);

    if (data) {
      return data;
    }

    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const findInstrumentosById = async (conjuntoID: number): Promise<MusicoInstrumentoCompleto> => {
  try {
    const urlRelativa = `${Environment.URL_BASE}/musico_instrumento/${conjuntoID}`;
    const { data } = await Api.get<MusicoInstrumentoCompleto>(urlRelativa);

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


const findIdByMusicoInstrumento = async (dados: MusicoInstrumentoCreate): Promise<number | Error> => {
  try {
    const urlRelativa = `${Environment.URL_BASE}/musico_instrumento/musico/${dados.musicoId}/instrumento/${dados.instrumentoId}`;
    const { data } = await Api.get<number>(urlRelativa);

    if (data) {
      return data;
    }

    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const deleteMusicoInstrumento = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`musico_instrumento/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao excluir o registro.');
  }
};


export const MusicoInstrumento = {
  create,
  findInstrumentosByMusico,
  deleteMusicoInstrumento,
  findIdByMusicoInstrumento,
  findInstrumentosById
}
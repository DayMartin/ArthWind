import { Environment } from '@/shared/environment';
import { Api } from './axios-config';
import { MusicoInstrumentoCreate, MusicoInstrumentoDetalhe } from '@/shared/interfaces/MusicoInstrumentoInterface';

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
}
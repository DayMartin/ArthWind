export interface MusicoInstrumentoCreate {
    musicoId: number;
    instrumentoId: number;
}

export interface MusicoInstrumentoDetalhe {
    id: number,
    instrumento: {
        id: number,
        name: string,
    }
}

export interface MusicoInstrumentoResponse {
    MusicoInstrumentoDetalhe: MusicoInstrumentoDetalhe
}

export interface MusicoInstrumentoCompleto {
  id: number;
  musico: {
    id: number;
    fullName: string;
    email: string;
    valorEvento: number;
  };
  instrumento: {
    id: number;
    name: string;
  };
}
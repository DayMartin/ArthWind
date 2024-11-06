export interface EventoMusicoCreate {
    conjuntoid: number;
    eventoId: number;
}

export interface EventoMusicoDetalhe {
    id: number,
    conjunto: {
        id: number
    }
}
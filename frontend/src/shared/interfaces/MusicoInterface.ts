export interface MusicoCreate {
    fullName: string;
    email: string;
    senha: string;
    type: string;
    status: string;
    valorEvento: number;
}
  
export interface MusicoDetalhe {
    id: number;
    fullName: string;
    email: string;
    senha: string;
    type: string;
    status: string;
    valorEvento: number;
}
  

export interface ApiResponseMusico {
    rows: MusicoDetalhe[]; 
    total: number;
}

export interface BarraMusicosProps {
    listar: () => void
}
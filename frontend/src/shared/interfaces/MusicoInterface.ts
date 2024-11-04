export interface MusicoCreate {
    fullName: string;
    email: string;
    senha: string;
    type: string;
    status: string;
    valorEvento: number;
    instrumentos: number[];
}
  
export interface MusicoDetalhe {
    id: number;
    fullName: string;
    email: string;
    senha: string;
    type: string;
    status: string;
    valorEvento: number;
    instrumentos: number[];
}
  

export interface ApiResponseMusico {
    rows: MusicoDetalhe[]; 
    total: number;
}

export interface BarraMusicosProps {
    listar: () => void
    onFilterIdChange: (id: string) => void;

}

export interface CadastrarMusicoProps {
    open: boolean;
    onClose: () => void;
    title: string;
    onSubmit: (data: any) => void; 
}

export interface MusicoDetalhesDialogProps {
    open: boolean;
    onClose: () => void;
    musico: MusicoDetalhe | null;
    onSave?: (musico: MusicoDetalhe) => void;
    isEditing: boolean;
}


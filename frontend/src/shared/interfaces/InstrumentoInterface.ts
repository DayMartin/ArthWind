export interface InstrumentoCreate {
    name: string;
}
  
export interface InstrumentoDetalhe {
    id: number;
    name: string;

}
  
export interface ApiResponseInstrumento {
    rows: InstrumentoDetalhe[]; 
    total: number;
}

export interface BarraInstrumentosProps {
    listar: () => void
    onFilterIdChange: (id: string) => void;

}

export interface CadastrarInstrumentoProps {
    open: boolean;
    onClose: () => void;
    title: string;
    onSubmit: (data: any) => void; 
}

export interface InstrumentoDetalhesDialogProps {
    open: boolean;
    onClose: () => void;
    instrumento: InstrumentoDetalhe | null;
    onSave?: (instrumento: InstrumentoDetalhe) => void;
    isEditing: boolean;
}
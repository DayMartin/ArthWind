import { MusicoInstrumentoCompleto } from "./MusicoInstrumentoInterface";

export interface EventCreate {
    descricao: string;
    data_de: string;
    data_ate: string;
    hora_de: string;
    hora_ate: string;
    status: string;
    valor_total: number;
    musicos: {
        id: number,
        instrumento: number;
    }[];
}

export interface EventDetalhe {
  id: number;
  descricao: string;
  data_de: string;
  data_ate: string;
  hora_de: string;
  hora_ate: string;
  status: string;
  valor_total: number;
  musicos: MusicoInstrumentoCompleto[]
}

export interface Event {
    id: string;
    title: string;
    date: string;
}
  
  
export interface NextEventsProps {
    events: EventDetalhe[];
}
  
export interface CustomCalendarProps {
    title: string;
}

export interface NovoEventoProps {
    open: boolean;
    onClose: () => void;
    title: string;
    onSubmit: (data: any) => void; 
}

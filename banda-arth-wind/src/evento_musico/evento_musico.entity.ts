import { Evento } from 'src/eventos/evento.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { MusicoInstrumento } from 'src/musico_instrumento/musico_instrumento.entity';

@Entity()
export class EventoMusico {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Evento, (evento) => evento.evento_musico)
  evento: Evento;

  @ManyToOne(() => MusicoInstrumento, (musico) => musico.conjunto)
  conjunto: MusicoInstrumento;

}

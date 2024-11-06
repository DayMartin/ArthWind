import { Evento } from 'src/eventos/evento.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { MusicoInstrumento } from 'src/musico_instrumento/musico_instrumento.entity';
import { Musico } from 'src/musicos/musico.entity';
import { Instrumento } from 'src/instrumentos/instrumento.entity';

@Entity()
export class EventoMusico {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Evento, (evento) => evento.evento_musico)
  evento: Evento;

  @ManyToOne(() => MusicoInstrumento, (musico) => musico.conjunto)
  conjunto: MusicoInstrumento;

}

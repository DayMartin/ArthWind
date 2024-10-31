import { Musico } from 'src/musicos/musico.entity';
import { Evento } from 'src/eventos/evento.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class EventoMusico {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Musico, (musico) => musico.evento_musico, { onDelete: 'CASCADE' })
  musico: Musico;

  @ManyToOne(() => Evento, (evento) => evento.evento_musico, { onDelete: 'CASCADE' })
  evento: Evento;

}

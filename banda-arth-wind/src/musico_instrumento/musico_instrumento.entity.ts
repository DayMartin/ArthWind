// musico-instrumento.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Musico } from 'src/musicos/musico.entity';
import { Instrumento } from 'src/instrumentos/instrumento.entity';
import { EventoMusico } from 'src/evento_musico/evento_musico.entity';

@Entity()
export class MusicoInstrumento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Musico, (musico) => musico.musicoInstrumentos, { onDelete: 'CASCADE' })
  musico: Musico;

  @ManyToOne(() => Instrumento, (instrumento) => instrumento.musicoInstrumentos, { onDelete: 'CASCADE' })
  instrumento: Instrumento;

  @ManyToOne(() => EventoMusico, (instrumento) => instrumento.conjunto, { onDelete: 'CASCADE' })
  conjunto: EventoMusico[];
}

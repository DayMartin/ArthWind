import { EventoMusico } from 'src/evento_musico/evento_musico.entity';
import { MusicoInstrumento } from 'src/musico_instrumento/musico_instrumento.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Instrumento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => MusicoInstrumento, (musicoInstrumento) => musicoInstrumento.instrumento)
  musicoInstrumentos: MusicoInstrumento[];

}

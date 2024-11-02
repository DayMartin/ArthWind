import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MusicoInstrumento } from 'src/musico_instrumento/musico_instrumento.entity';
import { EventoMusico } from 'src/evento_musico/evento_musico.entity';

@Entity()
export class Musico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column()
  type: string;

  @Column()
  status: string;

  @Column()
  valorEvento: number;

  @OneToMany(() => MusicoInstrumento, (musicoInstrumento) => musicoInstrumento.musico)
  musicoInstrumentos: MusicoInstrumento[];

  @OneToMany(() => EventoMusico, (evento_musico) => evento_musico.musico)
  evento_musico: EventoMusico[];

}

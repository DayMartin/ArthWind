import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MusicoInstrumento } from 'src/musico_instrumento/musico_instrumento.entity';

@Entity()
export class Musico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => MusicoInstrumento, (musicoInstrumento) => musicoInstrumento.musico)
  musicoInstrumentos: MusicoInstrumento[];

}

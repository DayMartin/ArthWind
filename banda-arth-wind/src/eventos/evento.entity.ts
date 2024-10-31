import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Evento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;

  @Column()
  data_de: string;

  @Column()
  data_ate: string;

  @Column()
  hora_de: string;

  @Column()
  hora_ate: string;

  @Column()
  status: string;

}
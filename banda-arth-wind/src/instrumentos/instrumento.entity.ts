import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Instrumento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

}

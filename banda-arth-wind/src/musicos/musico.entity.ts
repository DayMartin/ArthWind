import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Musico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column('simple-array')
  instruments: string[];
}

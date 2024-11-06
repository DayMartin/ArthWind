import { EventoMusico } from 'src/evento_musico/evento_musico.entity';
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

  @Column()
  valor_total: number;

  @OneToMany(() => EventoMusico, (evento_musico) => evento_musico.evento, { eager: true })
  evento_musico: EventoMusico[];

}

// eventos.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evento } from './evento.entity';
import { CreateEventosDto } from './dtos/create-eventos.dto';
import { UpdateEventosDto } from './dtos/update-eventos.dto';

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(Evento)
    private eventosRepository: Repository<Evento>,
  ) {}

  async create(createEventoDto: CreateEventosDto): Promise<Evento> {
    const evento = this.eventosRepository.create(createEventoDto);
    return this.eventosRepository.save(evento);
  }

  async findAll(): Promise<Evento[]> {
    const eventos = await this.eventosRepository.find();

    if (!eventos || !Array.isArray(eventos) || eventos.length === 0) {
      throw new NotFoundException(
        `Não existem eventos cadastrados no banco de dados`,
      );
    }

    return eventos;
  }

  async findOne(id: number): Promise<Evento> {
    const evento = await this.eventosRepository.findOne({
      where: { id },
      relations: ['evento_musico'],
    });
  
    if (!evento) {
      throw new NotFoundException(`Evento com o id ${id} não existe`);
    }
  
    return evento;
  }
  

  async update(id: number, updateEventoDto: UpdateEventosDto): Promise<Evento> {
    await this.findOne(id);
    await this.eventosRepository.update(id, updateEventoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.eventosRepository.delete(id);
  }
}

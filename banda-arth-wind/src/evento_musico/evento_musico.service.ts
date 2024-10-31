// eventos.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventoMusico } from './evento_musico.entity';
import { CreateEventoMusicoDto } from './dtos/create-evento_musico.dto';
import { UpdateEventoMusicoDto } from './dtos/update-evento_musico.dto';
import { Musico } from 'src/musicos/musico.entity';
import { Evento } from 'src/eventos/evento.entity';

@Injectable()
export class EventoMusicoService {
  constructor(
    @InjectRepository(EventoMusico)
    private eventoMusicoRepository: Repository<EventoMusico>,

    @InjectRepository(Musico)
    private musicoRepository: Repository<Musico>,

    @InjectRepository(Evento)
    private eventoRepository: Repository<Evento>,
  ) {}

  async addMusicoAoEvento(createEventoMusicoDto: CreateEventoMusicoDto): Promise<EventoMusico> {
    const musico = await this.musicoRepository.findOne({
      where: { id: createEventoMusicoDto.musicoId },
    });

    const evento = await this.eventoRepository.findOne({
      where: { id: createEventoMusicoDto.eventoId },
    });

    if (!musico || !evento) {
      throw new Error('Músico ou evento não encontrado');
    }

    const eventoMusico = this.eventoMusicoRepository.create({
      musico,
      evento,
    });

    return this.eventoMusicoRepository.save(eventoMusico);
  }

  async getAllEventoMusico(): Promise<EventoMusico[]> {
    return this.eventoMusicoRepository.find({
      relations: ['musico', 'evento'],
    });
  }

  async getEventoMusicoById(id: number): Promise<EventoMusico> {
    const eventoMusico = await this.eventoMusicoRepository.findOne({
      where: { id },
      relations: ['musico', 'evento'],
    });

    if (!eventoMusico) {
      throw new NotFoundException(`MusicoEvento with ID ${id} not found`);
    }

    return eventoMusico;
  }

  async updateEventoMusico(id: number, updateEventoMusicoDto: UpdateEventoMusicoDto): Promise<EventoMusico> {
    const eventoMusico = await this.getEventoMusicoById(id);
    const updatedEventoMusico = { ...eventoMusico, ...updateEventoMusicoDto };
    return this.eventoMusicoRepository.save(updatedEventoMusico);
  }


  async deleteEventoMusico(id: number): Promise<void> {
    const result = await this.eventoMusicoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`MusicoEvento with ID ${id} not found`);
    }
  }

  async getEventoByMusicoId(musicoId: number): Promise<EventoMusico[]> {
    return this.eventoMusicoRepository.find({
      where: { musico: { id: musicoId } },
      relations: ['evento'],
    });
  }

  async getMusicosByEventoId(eventoId: number): Promise<EventoMusico[]> {
    return this.eventoMusicoRepository.find({
      where: { evento: { id: eventoId } },
      relations: ['musico'],
    });
  }
}

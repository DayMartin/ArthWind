// eventos.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventoMusico } from './evento_musico.entity';
import { CreateEventoMusicoDto } from './dtos/create-evento_musico.dto';
import { UpdateEventoMusicoDto } from './dtos/update-evento_musico.dto';
import { Musico } from 'src/musicos/musico.entity';
import { Evento } from 'src/eventos/evento.entity';
import { Instrumento } from 'src/instrumentos/instrumento.entity';
import { MusicoInstrumento } from 'src/musico_instrumento/musico_instrumento.entity';

@Injectable()
export class EventoMusicoService {
  constructor(
    @InjectRepository(EventoMusico)
    private eventoMusicoRepository: Repository<EventoMusico>,

    @InjectRepository(MusicoInstrumento)
    private musicoInstrumentoRepository: Repository<MusicoInstrumento>,

    @InjectRepository(Musico)
    private musicoRepository: Repository<Musico>,

    @InjectRepository(Evento)
    private eventoRepository: Repository<Evento>,
  ) {}

  async addMusicoAoEvento(createEventoMusicoDto: CreateEventoMusicoDto): Promise<EventoMusico> {
    const conjunto = await this.musicoInstrumentoRepository.findOne({
      where: { id: createEventoMusicoDto.conjuntoid },
    });

    const evento = await this.eventoRepository.findOne({
      where: { id: createEventoMusicoDto.eventoId },
    });

    if (!conjunto || !evento) {
      throw new Error('evento ou conjunto não encontrado');
    }

    const eventoMusico = this.eventoMusicoRepository.create({
      conjunto,
      evento,
    });

    return this.eventoMusicoRepository.save(eventoMusico);
  }

  async getAllEventoMusico(): Promise<EventoMusico[]> {
    return this.eventoMusicoRepository.find({
      relations: ['musico', 'evento', 'instrumento'],
    });
  }

  async getEventoMusicoById(id: number): Promise<EventoMusico> {
    const eventoMusico = await this.eventoMusicoRepository.findOne({
      where: { id },
      relations: ['evento', 'conjunto'],
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

  async deleteEventoMusicoByEventoId(eventoId: number): Promise<void> {
    const eventoMusicos = await this.eventoMusicoRepository.find({
      where: { evento: { id: eventoId } },
    });

    if (eventoMusicos.length === 0) {
      throw new NotFoundException(
        `Nenhum MusicoEvento encontrado para o Evento com ID ${eventoId}`,
      );
    }
    const result = await this.eventoMusicoRepository.delete({
      evento: { id: eventoId },
    });

    if (result.affected === 0) {
      throw new NotFoundException(
        `Não foi possível excluir MusicoEvento com Evento ID ${eventoId}`,
      );
    }
    console.log(
      `Excluídos ${result.affected} registros de EventoMusico para o Evento ID ${eventoId}`,
    );
  }

  async getEventoByMusicoId(musicoId: number): Promise<EventoMusico[]> {
    return this.eventoMusicoRepository.find({
      where: { conjunto: { id: musicoId } },
      relations: ['evento'],
    });
  }

  async getMusicosByEventoId(eventoId: number): Promise<EventoMusico[]> {
    return this.eventoMusicoRepository.find({
      where: { evento: { id: eventoId } },
      relations: ["conjunto"],
    });
  }
}

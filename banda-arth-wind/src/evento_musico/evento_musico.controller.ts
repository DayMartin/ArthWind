// evento_musico.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EventoMusicoService } from './evento_musico.service';
import { CreateEventoMusicoDto } from './dtos/create-evento_musico.dto';
import { EventoMusico } from './evento_musico.entity';
import { UpdateEventoMusicoDto } from './dtos/update-evento_musico.dto';

@Controller('evento_musico')
export class EventoMusicoController {
  constructor(private readonly evento_musicoService: EventoMusicoService) {}

  @Post()
  async create(@Body() createEventoMusicoDto: CreateEventoMusicoDto): Promise<EventoMusico> {
    return this.evento_musicoService.addMusicoAoEvento(createEventoMusicoDto);
  }

  @Get('all')
  async getAllEventoMusicos(): Promise<EventoMusico[]> {
    return this.evento_musicoService.getAllEventoMusico();
  }
  
  @Get(':id')
  async getEventoMusico(@Param('id') id: number): Promise<EventoMusico> {
    return this.evento_musicoService.getEventoMusicoById(id);
  }

  @Put(':id')
  async updateEventoMusico(@Param('id') id: number, @Body() updateEventoMusicoDto: UpdateEventoMusicoDto) {
    return this.evento_musicoService.updateEventoMusico(id, updateEventoMusicoDto);
  }

  @Delete(':id')
  async deleteEventoMusico(@Param('id') id: number): Promise<void> {
    return this.evento_musicoService.deleteEventoMusico(id);
  }

  @Get('musico/:musicoId')
  async getEventosByMusicoId(@Param('musicoId') musicoId: number): Promise<EventoMusico[]> {
    return this.evento_musicoService.getEventoByMusicoId(musicoId);
  }

  @Get('evento/:eventoId')
  async getMusicosByEventoId(@Param('eventoId') eventoId: number): Promise<EventoMusico[]> {
    return this.evento_musicoService.getMusicosByEventoId(eventoId);
}
}
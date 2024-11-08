// evento_musico.controller.ts
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { EventoMusicoService } from './evento_musico.service';
import { CreateEventoMusicoDto } from './dtos/create-evento_musico.dto';
import { EventoMusico } from './evento_musico.entity';
import { UpdateEventoMusicoDto } from './dtos/update-evento_musico.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('evento_musico')
export class EventoMusicoController {
  constructor(private readonly evento_musicoService: EventoMusicoService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createEventoMusicoDto: CreateEventoMusicoDto,
  ): Promise<EventoMusico> {
    return this.evento_musicoService.addMusicoAoEvento(createEventoMusicoDto);
  }

  @UseGuards(AuthGuard)
  @Get('all')
  async getAllEventoMusicos(): Promise<EventoMusico[]> {
    return this.evento_musicoService.getAllEventoMusico();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getEventoMusico(@Param('id') id: number): Promise<EventoMusico> {
    return this.evento_musicoService.getEventoMusicoById(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateEventoMusico(
    @Param('id') id: number,
    @Body() updateEventoMusicoDto: UpdateEventoMusicoDto,
  ) {
    return this.evento_musicoService.updateEventoMusico(
      id,
      updateEventoMusicoDto,
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteEventoMusico(@Param('id') id: number): Promise<void> {
    return this.evento_musicoService.deleteEventoMusico(id);
  }

  @UseGuards(AuthGuard)
  @Delete('evento/:id')
  async deleteEventoMusicoByEvento(@Param('id') id: number): Promise<void> {
    try {
      await this.evento_musicoService.deleteEventoMusicoByEventoId(id);
    } catch (error) {
      throw new NotFoundException(
        `Não foi possível excluir MusicoEvento para o Evento com ID ${id} ${error}.`,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get('musico/:musicoId')
  async getEventosByMusicoId(
    @Param('musicoId') musicoId: number,
  ): Promise<EventoMusico[]> {
    return this.evento_musicoService.getEventoByMusicoId(musicoId);
  }

  @UseGuards(AuthGuard)
  @Get('evento/:eventoId')
  async getMusicosByEventoId(
    @Param('eventoId') eventoId: number,
  ): Promise<EventoMusico[]> {
    return this.evento_musicoService.getMusicosByEventoId(eventoId);
  }
}

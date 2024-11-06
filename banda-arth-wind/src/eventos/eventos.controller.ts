// eventos.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { CreateEventosDto } from './dtos/create-eventos.dto';
import { Evento } from './evento.entity';
import { UpdateEventosDto } from './dtos/update-eventos.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createEventoDto: CreateEventosDto): Promise<Evento> {
    return this.eventosService.create(createEventoDto);
  }

  @UseGuards(AuthGuard)
  @Get('all')
  async findAll(): Promise<Evento[]> {
    return this.eventosService.findAll();
  }

  // @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Evento> {
    return this.eventosService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateEventoDto: UpdateEventosDto): Promise<Evento> {
    return this.eventosService.update(id, updateEventoDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.eventosService.remove(id);
  }
}

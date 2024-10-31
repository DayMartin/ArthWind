// instrumentos.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { CreateEventosDto } from './dtos/create-eventos.dto';
import { Evento } from './evento.entity';
import { UpdateEventosDto } from './dtos/update-eventos.dto';

@Controller('instrumentos')
export class EventosController {
  constructor(private readonly instrumentosService: EventosService) {}

  @Post()
  async create(@Body() createMusicoDto: CreateEventosDto): Promise<Evento> {
    return this.instrumentosService.create(createMusicoDto);
  }

  @Get('all')
  async findAll(): Promise<Evento[]> {
    return this.instrumentosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Evento> {
    return this.instrumentosService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateMusicoDto: UpdateEventosDto): Promise<Evento> {
    return this.instrumentosService.update(id, updateMusicoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.instrumentosService.remove(id);
  }
}

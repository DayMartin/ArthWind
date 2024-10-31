// instrumentos.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { InstrumentosService } from './instrumentos.service';
import { CreateInstrumentoDto } from './dtos/create-instrumentos.dto';
import { Instrumento } from './instrumento.entity';
import { UpdateInstrumentoDto } from './dtos/update-instrumentos.dto';

@Controller('instrumentos')
export class InstrumentosController {
  constructor(private readonly instrumentosService: InstrumentosService) {}

  @Post()
  async create(@Body() createMusicoDto: CreateInstrumentoDto): Promise<Instrumento> {
    return this.instrumentosService.create(createMusicoDto);
  }

  @Get('all')
  async findAll(): Promise<Instrumento[]> {
    return this.instrumentosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Instrumento> {
    return this.instrumentosService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateMusicoDto: UpdateInstrumentoDto): Promise<Instrumento> {
    return this.instrumentosService.update(id, updateMusicoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.instrumentosService.remove(id);
  }
}

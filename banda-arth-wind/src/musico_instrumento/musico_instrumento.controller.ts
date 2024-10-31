// musico_instrumento.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MusicoInstrumentoService } from './musico_instrumento.service';
import { CreateMusicoInstrumentoDto } from './dtos/create-musico_instrumento.dto';
import { MusicoInstrumento } from './musico_instrumento.entity';
import { UpdateMusicoInstrumentoDto } from './dtos/update-musico_instrumento.dto';

@Controller('musico_instrumento')
export class MusicoInstrumentoController {
  constructor(private readonly musicoInstrumentoService: MusicoInstrumentoService) {}

  @Post()
  async addInstrumentoToMusico(@Body() createMusicoInstrumentoDto: CreateMusicoInstrumentoDto) {
    return this.musicoInstrumentoService.addInstrumentoToMusico(createMusicoInstrumentoDto);
  }
  
  @Get('all')
  async getAllMusicoInstrumentos(): Promise<MusicoInstrumento[]> {
    return this.musicoInstrumentoService.getAllMusicoInstrumentos();
  }
  
  @Get(':id')
  async getMusicoInstrumento(@Param('id') id: number): Promise<MusicoInstrumento> {
    return this.musicoInstrumentoService.getMusicoInstrumentoById(id);
  }

  @Put(':id')
  async updateMusicoInstrumento(@Param('id') id: number, @Body() updateMusicoInstrumentoDto: UpdateMusicoInstrumentoDto) {
    return this.musicoInstrumentoService.updateMusicoInstrumento(id, updateMusicoInstrumentoDto);
  }

  @Delete(':id')
  async deleteMusicoInstrumento(@Param('id') id: number): Promise<void> {
    return this.musicoInstrumentoService.deleteMusicoInstrumento(id);
  }

  @Get('musico/:musicoId')
  async getInstrumentosByMusicoId(@Param('musicoId') musicoId: number): Promise<MusicoInstrumento[]> {
    return this.musicoInstrumentoService.getInstrumentosByMusicoId(musicoId);
  }

  @Get('instrumento/:instrumentoId')
  async getMusicosByInstrumentoId(@Param('instrumentoId') instrumentoId: number): Promise<MusicoInstrumento[]> {
    return this.musicoInstrumentoService.getMusicosByInstrumentoId(instrumentoId);
  }
}

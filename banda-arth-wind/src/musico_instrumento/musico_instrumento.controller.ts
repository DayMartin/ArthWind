// musico_instrumento.controller.ts
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MusicoInstrumentoService } from './musico_instrumento.service';
import { CreateMusicoInstrumentoDto } from './dtos/create-musico_instrumento.dto';
import { MusicoInstrumento } from './musico_instrumento.entity';
import { UpdateMusicoInstrumentoDto } from './dtos/update-musico_instrumento.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('musico_instrumento')
export class MusicoInstrumentoController {
  constructor(private readonly musicoInstrumentoService: MusicoInstrumentoService) {}

  @UseGuards(AuthGuard)
  @Post()
  async addInstrumentoToMusico(@Body() createMusicoInstrumentoDto: CreateMusicoInstrumentoDto) {
    return this.musicoInstrumentoService.addInstrumentoToMusico(createMusicoInstrumentoDto);
  }

  @UseGuards(AuthGuard)
  @Get('all')
  async getAllMusicoInstrumentos(): Promise<MusicoInstrumento[]> {
    return this.musicoInstrumentoService.getAllMusicoInstrumentos();
  }
  
  @UseGuards(AuthGuard)
  @Get(':id')
  async getMusicoInstrumento(@Param('id') id: number): Promise<MusicoInstrumento> {
    return this.musicoInstrumentoService.getMusicoInstrumentoById(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateMusicoInstrumento(@Param('id') id: number, @Body() updateMusicoInstrumentoDto: UpdateMusicoInstrumentoDto) {
    return this.musicoInstrumentoService.updateMusicoInstrumento(id, updateMusicoInstrumentoDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteMusicoInstrumento(@Param('id') id: number): Promise<void> {
    return this.musicoInstrumentoService.deleteMusicoInstrumento(id);
  }

  @UseGuards(AuthGuard)
  @Get('musico/:musicoId')
  async getInstrumentosByMusicoId(@Param('musicoId') musicoId: number): Promise<MusicoInstrumento[]> {
    return this.musicoInstrumentoService.getInstrumentosByMusicoId(musicoId);
  }

  @UseGuards(AuthGuard)
  @Get('instrumento/:instrumentoId')
  async getMusicosByInstrumentoId(@Param('instrumentoId') instrumentoId: number): Promise<MusicoInstrumento[]> {
    return this.musicoInstrumentoService.getMusicosByInstrumentoId(instrumentoId);
  }

  @UseGuards(AuthGuard)
  @Get('musico/:musicoId/instrumento/:instrumentoId')
  async getMusicoInstrumentoIdByMusicoAndInstrumento(
    @Param('musicoId') musicoId: number,
    @Param('instrumentoId') instrumentoId: number,
  ): Promise<number> {
    try {
      return await this.musicoInstrumentoService.getMusicoInstrumentoIdByMusicoAndInstrumento(musicoId, instrumentoId);
    } catch (error) {
      throw new NotFoundException(`MusicoInstrumento with Musico ID ${musicoId} and Instrumento ID ${instrumentoId} not found`);
    }
  }
}

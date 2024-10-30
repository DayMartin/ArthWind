// musicos.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MusicosService } from './musicos.service';
import { CreateMusicoDto } from './dtos/create-musicos.dto';
import { Musico } from './musico.entity';
import { UpdateMusicoDto } from './dtos/update-musicos.dto';

@Controller('musicos')
export class MusicosController {
  constructor(private readonly musicosService: MusicosService) {}

  @Post()
  async create(@Body() createMusicoDto: CreateMusicoDto): Promise<Musico> {
    return this.musicosService.create(createMusicoDto);
  }

  @Get('all')
  async findAll(): Promise<Musico[]> {
    return this.musicosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Musico> {
    return this.musicosService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateMusicoDto: UpdateMusicoDto): Promise<Musico> {
    return this.musicosService.update(id, updateMusicoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.musicosService.remove(id);
  }
}

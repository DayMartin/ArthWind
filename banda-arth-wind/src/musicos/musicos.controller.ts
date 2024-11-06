// musicos.controller.ts
import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { MusicosService } from './musicos.service';
import { CreateMusicoDto } from './dtos/create-musicos.dto';
import { Musico } from './musico.entity';
import { UpdateMusicoDto } from './dtos/update-musicos.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('musicos')
export class MusicosController {
  constructor(private readonly musicosService: MusicosService) {}

  @Post('create')
  async create(@Body() createMusicoDto: CreateMusicoDto): Promise<Musico> {
    return this.musicosService.create(createMusicoDto);
  }

  @UseGuards(AuthGuard)
  @Get("all")
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('nome') nome?: string,
  ): Promise<{ rows: Musico[]; total: number }> {
    return this.musicosService.findAll(page, limit, nome);
  }

  @UseGuards(AuthGuard)
  @Get('list')
  async findList(): Promise<Musico[]> {
    return this.musicosService.findList();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Musico> {
    return this.musicosService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateMusicoDto: UpdateMusicoDto): Promise<Musico> {
    return this.musicosService.update(id, updateMusicoDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/status')
  async updateMusicoStatus(
    @Param('id') id: number,
    @Body('status') status: string
  ): Promise<Musico> {
    return this.musicosService.updateStatus(id, status);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.musicosService.remove(id);
  }
}

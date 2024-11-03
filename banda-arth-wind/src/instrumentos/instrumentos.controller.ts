import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { InstrumentosService } from './instrumentos.service';
import { CreateInstrumentoDto } from './dtos/create-instrumentos.dto';
import { Instrumento } from './instrumento.entity';
import { UpdateInstrumentoDto } from './dtos/update-instrumentos.dto';

@Controller('instrumentos')
export class InstrumentosController {
  constructor(private readonly instrumentosService: InstrumentosService) {}

  @Post()
  async create(@Body() createInstrumentosDto: CreateInstrumentoDto): Promise<Instrumento> {
    return this.instrumentosService.create(createInstrumentosDto);
  }

  @Get("all")
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('nome') nome?: string,
  ): Promise<{ rows: Instrumento[]; total: number }> {
    return this.instrumentosService.findAll(page, limit, nome);
  }

  @Get('list')
  async findList(): Promise<Instrumento[]> {
    return this.instrumentosService.findList();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Instrumento> {
    return this.instrumentosService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateInstrumentosDto: UpdateInstrumentoDto): Promise<Instrumento> {
    return this.instrumentosService.update(id, updateInstrumentosDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      await this.instrumentosService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, 448);
    }
  }
}

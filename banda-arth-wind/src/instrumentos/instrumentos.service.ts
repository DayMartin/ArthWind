// instrumentos.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Instrumento } from './instrumento.entity';
import { CreateInstrumentoDto } from './dtos/create-instrumentos.dto';
import { UpdateInstrumentoDto } from './dtos/update-instrumentos.dto';

@Injectable()
export class InstrumentosService {
  constructor(
    @InjectRepository(Instrumento)
    private instrumentosRepository: Repository<Instrumento>,
  ) {}

  async create(createMusicoDto: CreateInstrumentoDto): Promise<Instrumento> {
    const musico = this.instrumentosRepository.create(createMusicoDto);
    return this.instrumentosRepository.save(musico);
  }

  async findAll(): Promise<Instrumento[]> {
    const instrumentos = await this.instrumentosRepository.find();

    if (!instrumentos || !Array.isArray(instrumentos) || instrumentos.length === 0) {
      throw new NotFoundException(
        `Não existem instrumentos cadastrados no banco de dados`,
      );
    }

    return instrumentos;
  }

  async findOne(id: number): Promise<Instrumento> {
    const musico = await this.instrumentosRepository.findOneBy({ id });
    if (!musico) {
      throw new NotFoundException(`musico com o id ${id} não existe`);
    }
    return musico;
  }

  async update(id: number, updateMusicoDto: UpdateInstrumentoDto): Promise<Instrumento> {
    await this.findOne(id);
    await this.instrumentosRepository.update(id, updateMusicoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.instrumentosRepository.delete(id);
  }
}

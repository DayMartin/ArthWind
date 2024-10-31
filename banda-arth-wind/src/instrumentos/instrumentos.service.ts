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

  async create(createInstrumentosDto: CreateInstrumentoDto): Promise<Instrumento> {
    const instrumento = this.instrumentosRepository.create(createInstrumentosDto);
    return this.instrumentosRepository.save(instrumento);
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
    const instrumento = await this.instrumentosRepository.findOneBy({ id });
    if (!instrumento) {
      throw new NotFoundException(`instrumento com o id ${id} não existe`);
    }
    return instrumento;
  }

  async update(id: number, updateInstrumentoDto: UpdateInstrumentoDto): Promise<Instrumento> {
    await this.findOne(id);
    await this.instrumentosRepository.update(id, updateInstrumentoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.instrumentosRepository.delete(id);
  }
}

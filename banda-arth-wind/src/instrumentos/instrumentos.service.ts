// instrumentos.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Instrumento } from './instrumento.entity';
import { MusicoInstrumento } from 'src/musico_instrumento/musico_instrumento.entity';
import { CreateInstrumentoDto } from './dtos/create-instrumentos.dto';
import { UpdateInstrumentoDto } from './dtos/update-instrumentos.dto';
@Injectable()
export class InstrumentosService {
  constructor(
    @InjectRepository(Instrumento)
    private instrumentosRepository: Repository<Instrumento>,

    @InjectRepository(MusicoInstrumento)
    private musicoInstrumentoRepository: Repository<MusicoInstrumento>,
  ) {}

  async create(createInstrumentosDto: CreateInstrumentoDto): Promise<Instrumento> {
    const instrumento = this.instrumentosRepository.create(createInstrumentosDto);
    try {
      return this.instrumentosRepository.save(instrumento);
    } catch (error) {
      console.log('Error', error)
    }
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    nome?: string,
  ): Promise<{ rows: Instrumento[]; total: number }> {
    const queryBuilder = this.instrumentosRepository.createQueryBuilder('instrumentos');

    if (nome) {
      queryBuilder.andWhere('instrumentos.name LIKE :nome', { nome: `%${nome}%` });
    }
    const [instrumentos, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    if (!instrumentos || instrumentos.length === 0) {
      throw new NotFoundException(`Nenhum instrumento encontrado.`);
    }
    return { rows: instrumentos, total };
  }

  async findList(): Promise<Instrumento[]> {
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
    const instrumento = await this.instrumentosRepository.findOne({ where: { id } });
    if (!instrumento) {
      throw new Error('Instrumento não encontrado.');
    }
  
    const count = await this.musicoInstrumentoRepository.count({
      where: { instrumento: { id } },
    });
  
    if (count > 0) {
      throw new Error('Não é possível excluir este instrumento porque ele está atrelado a um ou mais músicos.');
    }
  
    await this.instrumentosRepository.delete(id);
  }
  
}

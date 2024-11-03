// musicos.service.ts
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Musico } from './musico.entity';
import { CreateMusicoDto } from './dtos/create-musicos.dto';
import { UpdateMusicoDto } from './dtos/update-musicos.dto';

@Injectable()
export class MusicosService {
  constructor(
    @InjectRepository(Musico)
    private musicosRepository: Repository<Musico>,
  ) {}

  async create(createMusicoDto: CreateMusicoDto): Promise<Musico> {
    const existingMusico = await this.musicosRepository.findOne({
      where: { email: createMusicoDto.email },
    });
    if (existingMusico) {
      throw new ConflictException('Email já cadastrado.');
    }
    const musico = this.musicosRepository.create(createMusicoDto);
    try {
      return await this.musicosRepository.save(musico);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Conflito de dados ao criar o músico.');
      }
      throw new InternalServerErrorException('Erro ao criar o músico.');
    }
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    id?: number,
    nome?: string,
  ): Promise<{ rows: Musico[]; total: number }> {
    const queryBuilder = this.musicosRepository.createQueryBuilder('musico');

    if (id) {
      queryBuilder.andWhere('musico.id = :id', { id });
    }
    if (nome) {
      queryBuilder.andWhere('musico.fullName LIKE :nome', { nome: `%${nome}%` });
    }
    const [musicos, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    if (!musicos || musicos.length === 0) {
      throw new NotFoundException(`Nenhum músico encontrado.`);
    }
    return { rows: musicos, total };
  }

  async findList(): Promise<Musico[]> {
    const musicos = await this.musicosRepository.find();

    if (!musicos || !Array.isArray(musicos) || musicos.length === 0) {
      throw new NotFoundException(
        `Não existem musicos cadastrados no banco de dados`,
      );
    }

    return musicos;
  }

  async findOne(id: number): Promise<Musico> {
    const musico = await this.musicosRepository.findOneBy({ id });
    if (!musico) {
      throw new NotFoundException(`musico com o id ${id} não existe`);
    }
    return musico;
  }

  async update(id: number, updateMusicoDto: UpdateMusicoDto): Promise<Musico> {
    try {
      await this.findOne(id);
      await this.musicosRepository.update(id, updateMusicoDto);
      return this.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Músico com id ${id} não encontrado.`);
      }
      throw new InternalServerErrorException('Erro ao atualizar o músico.');
    }
  }

  async updateStatus(id: number, status: string): Promise<Musico> {
    const musico = await this.findOne(id);
    if (!musico) {
      throw new NotFoundException(`Músico com id ${id} não encontrado.`);
    }
    musico.status = status;
    await this.musicosRepository.save(musico);
    return musico;
  }
  
  async remove(id: number): Promise<void> {
    try {
      await this.findOne(id);
      await this.musicosRepository.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Músico com id ${id} não encontrado.`);
      }
      throw new InternalServerErrorException('Erro ao remover o músico.');
    }
  }
}

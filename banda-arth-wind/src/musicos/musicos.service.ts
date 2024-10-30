// musicos.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
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
    const musico = this.musicosRepository.create(createMusicoDto);
    return this.musicosRepository.save(musico);
  }

  async findAll(): Promise<Musico[]> {
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
    await this.findOne(id);
    await this.musicosRepository.update(id, updateMusicoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.musicosRepository.delete(id);
  }
}

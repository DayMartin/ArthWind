// musico_instrumento.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MusicoInstrumento } from './musico_instrumento.entity';
import { CreateMusicoInstrumentoDto } from './dtos/create-musico_instrumento.dto';
import { UpdateMusicoInstrumentoDto } from './dtos/update-musico_instrumento.dto';
import { Musico } from 'src/musicos/musico.entity';
import { Instrumento } from 'src/instrumentos/instrumento.entity';

@Injectable()
export class MusicoInstrumentoService {
  constructor(
    @InjectRepository(MusicoInstrumento)
    private musicoInstrumentoRepository: Repository<MusicoInstrumento>,
    
    @InjectRepository(Musico)
    private musicoRepository: Repository<Musico>,

    @InjectRepository(Instrumento)
    private instrumentoRepository: Repository<Instrumento>,
  ) {}

  async addInstrumentoToMusico(createMusicoInstrumentoDto: CreateMusicoInstrumentoDto): Promise<MusicoInstrumento> {
    const musico = await this.musicoRepository.findOne({
      where: { id: createMusicoInstrumentoDto.musicoId },
    });

    const instrumento = await this.instrumentoRepository.findOne({
      where: { id: createMusicoInstrumentoDto.instrumentoId },
    });

    if (!musico || !instrumento) {
      throw new Error('Músico ou Instrumento não encontrado');
    }

    const musicoInstrumento = this.musicoInstrumentoRepository.create({
      musico,
      instrumento,
    });

    return this.musicoInstrumentoRepository.save(musicoInstrumento);
  }

  async getAllMusicoInstrumentos(): Promise<MusicoInstrumento[]> {
    return this.musicoInstrumentoRepository.find({
      relations: ['musico', 'instrumento'],
    });
  }
  

  async getMusicoInstrumentoById(id: number): Promise<MusicoInstrumento> {
    const musicoInstrumento = await this.musicoInstrumentoRepository.findOne({
      where: { id },
      relations: ['musico', 'instrumento'],
    });

    if (!musicoInstrumento) {
      throw new NotFoundException(`MusicoInstrumento with ID ${id} not found`);
    }

    return musicoInstrumento;
  }

  async updateMusicoInstrumento(id: number, updateMusicoInstrumentoDto: UpdateMusicoInstrumentoDto): Promise<MusicoInstrumento> {
    const musicoInstrumento = await this.getMusicoInstrumentoById(id);
    const updatedMusicoInstrumento = { ...musicoInstrumento, ...updateMusicoInstrumentoDto };
    return this.musicoInstrumentoRepository.save(updatedMusicoInstrumento);
  }

  async deleteMusicoInstrumento(id: number): Promise<void> {
    const result = await this.musicoInstrumentoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`MusicoInstrumento with ID ${id} not found`);
    }
  }

  async getInstrumentosByMusicoId(musicoId: number): Promise<MusicoInstrumento[]> {
    return this.musicoInstrumentoRepository.find({
      where: { musico: { id: musicoId } },
      relations: ['instrumento'],
    });
  }

  async getMusicosByInstrumentoId(instrumentoId: number): Promise<MusicoInstrumento[]> {
    return this.musicoInstrumentoRepository.find({
      where: { instrumento: { id: instrumentoId } },
      relations: ['musico'],
    });
  }

  async getMusicoInstrumentoIdByMusicoAndInstrumento(
    musicoId: number,
    instrumentoId: number
  ): Promise<number> {
    const musicoInstrumento = await this.musicoInstrumentoRepository.findOne({
      where: {
        musico: { id: musicoId },
        instrumento: { id: instrumentoId },
      },
    });
  
    if (!musicoInstrumento) {
      throw new NotFoundException(
        `MusicoInstrumento with Musico ID ${musicoId} and Instrumento ID ${instrumentoId} not found`
      );
    }
  
    return musicoInstrumento.id;
  } 
}

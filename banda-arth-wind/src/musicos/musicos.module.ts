import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MusicosService } from './musicos.service';
import { MusicosController } from './musicos.controller';
import { Musico } from './musico.entity';
import { Instrumento } from 'src/instrumentos/instrumento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Musico, Instrumento])],
  providers: [MusicosService],
  controllers: [MusicosController],
})
export class MusicosModule {}

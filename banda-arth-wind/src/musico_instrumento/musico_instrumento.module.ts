import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MusicoInstrumentoService } from './musico_instrumento.service';
import { MusicoInstrumentoController } from './musico_instrumento.controller';
import { MusicoInstrumento } from './musico_instrumento.entity';
import { Musico } from 'src/musicos/musico.entity';
import { Instrumento } from 'src/instrumentos/instrumento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MusicoInstrumento, Musico, Instrumento])],
  providers: [MusicoInstrumentoService],
  controllers: [MusicoInstrumentoController],
})
export class MusicoInstrumentoModule {}

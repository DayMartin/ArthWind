import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InstrumentosService } from './instrumentos.service';
import { InstrumentosController } from './instrumentos.controller';
import { Instrumento } from './instrumento.entity';
import { Musico } from 'src/musicos/musico.entity';
import { MusicoInstrumento } from 'src/musico_instrumento/musico_instrumento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Instrumento, Musico, MusicoInstrumento])],
  providers: [InstrumentosService],
  controllers: [InstrumentosController],
})
export class InstrumentosModule {}

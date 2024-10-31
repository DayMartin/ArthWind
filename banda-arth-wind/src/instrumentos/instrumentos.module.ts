import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InstrumentosService } from './instrumentos.service';
import { InstrumentosController } from './instrumentos.controller';
import { Instrumento } from './instrumento.entity';
import { Musico } from 'src/musicos/musico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Instrumento, Musico])],
  providers: [InstrumentosService],
  controllers: [InstrumentosController],
})
export class InstrumentosModule {}

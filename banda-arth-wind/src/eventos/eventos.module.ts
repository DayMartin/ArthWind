import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventosService } from './eventos.service';
import { EventosController } from './eventos.controller';
import { Evento } from './evento.entity';
import { Musico } from 'src/musicos/musico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Evento, Musico])],
  providers: [EventosService],
  controllers: [EventosController],
})
export class EventosModule {}

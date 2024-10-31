import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventoMusicoService } from './evento_musico.service';
import { EventoMusicoController } from './evento_musico.controller';
import { EventoMusico } from './evento_musico.entity';
import { Musico } from 'src/musicos/musico.entity';
import { Evento } from 'src/eventos/evento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventoMusico, Musico, Evento])],
  providers: [EventoMusicoService],
  controllers: [EventoMusicoController],
})
export class EventoMusicoModule {}

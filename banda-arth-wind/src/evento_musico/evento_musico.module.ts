import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventoMusicoService } from './evento_musico.service';
import { EventoMusicoController } from './evento_musico.controller';
import { EventoMusico } from './evento_musico.entity';
import { Musico } from 'src/musicos/musico.entity';
import { Evento } from 'src/eventos/evento.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([EventoMusico, Musico, Evento]),
  JwtModule.register({
    secret: process.env.HASH || 'UHSUDHK38DSUHDSKJDUSBCBUUH3',
    signOptions: { expiresIn: '1h' }, 
  }),
],
  providers: [EventoMusicoService, AuthGuard],
  controllers: [EventoMusicoController],
})
export class EventoMusicoModule {}

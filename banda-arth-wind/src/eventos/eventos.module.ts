import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventosService } from './eventos.service';
import { EventosController } from './eventos.controller';
import { Evento } from './evento.entity';
import { Musico } from 'src/musicos/musico.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Evento, Musico]),
  JwtModule.register({
    secret: process.env.HASH || 'UHSUDHK38DSUHDSKJDUSBCBUUH3',
    signOptions: { expiresIn: '1h' }, 
  }),
],
  providers: [EventosService, AuthGuard],
  controllers: [EventosController],
})
export class EventosModule {}

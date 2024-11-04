import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MusicosService } from './musicos.service';
import { MusicosController } from './musicos.controller';
import { Musico } from './musico.entity';
import { Instrumento } from 'src/instrumentos/instrumento.entity';
import { Evento } from 'src/eventos/evento.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Musico, Instrumento, Evento]),
    JwtModule.register({
      secret: process.env.HASH || 'UHSUDHK38DSUHDSKJDUSBCBUUH3',
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  providers: [MusicosService, AuthGuard],
  controllers: [MusicosController],
  exports: [MusicosService, MusicosModule],
})
export class MusicosModule {}

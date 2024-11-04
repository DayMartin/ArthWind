import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InstrumentosService } from './instrumentos.service';
import { InstrumentosController } from './instrumentos.controller';
import { Instrumento } from './instrumento.entity';
import { Musico } from 'src/musicos/musico.entity';
import { MusicoInstrumento } from 'src/musico_instrumento/musico_instrumento.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Instrumento, Musico, MusicoInstrumento]),
  JwtModule.register({
    secret: process.env.HASH || 'UHSUDHK38DSUHDSKJDUSBCBUUH3',
    signOptions: { expiresIn: '1h' }, 
  }),
],
  providers: [InstrumentosService, AuthGuard],
  controllers: [InstrumentosController],
})
export class InstrumentosModule {}

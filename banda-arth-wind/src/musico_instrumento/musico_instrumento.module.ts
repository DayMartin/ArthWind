import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MusicoInstrumentoService } from './musico_instrumento.service';
import { MusicoInstrumentoController } from './musico_instrumento.controller';
import { MusicoInstrumento } from './musico_instrumento.entity';
import { Musico } from 'src/musicos/musico.entity';
import { Instrumento } from 'src/instrumentos/instrumento.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([MusicoInstrumento, Musico, Instrumento]),
  JwtModule.register({
    secret: process.env.HASH || 'UHSUDHK38DSUHDSKJDUSBCBUUH3',
    signOptions: { expiresIn: '1h' }, 
  }),
],
  providers: [MusicoInstrumentoService, AuthGuard],
  controllers: [MusicoInstrumentoController],
  exports: [MusicoInstrumentoService]
})
export class MusicoInstrumentoModule {}

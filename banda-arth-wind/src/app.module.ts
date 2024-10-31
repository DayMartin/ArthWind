import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MusicosModule } from './musicos/musicos.module';
import { InstrumentosModule } from './instrumentos/instrumentos.module';
import { MusicoInstrumentoModule } from './musico_instrumento/musico_instrumento.module';
// import config from './config';
import { typeormModule } from './config';
import { EventosModule } from './eventos/eventos.module';
import { EventoMusicoModule } from './evento_musico/evento_musico.module';

@Module({
  imports: [
    AuthModule, 
    MusicosModule, 
    InstrumentosModule, 
    MusicoInstrumentoModule,
    EventosModule,
    EventoMusicoModule, 
    TypeOrmModule.forRoot(typeormModule)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

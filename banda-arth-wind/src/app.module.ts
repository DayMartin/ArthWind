import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MusicosModule } from './musicos/musicos.module';
import { InstrumentosModule } from './instrumentos/instrumentos.module';
// import config from './config';
import { typeormModule } from './config';

@Module({
  imports: [AuthModule, MusicosModule, InstrumentosModule, TypeOrmModule.forRoot(typeormModule)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

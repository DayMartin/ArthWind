import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MusicosService } from './musicos.service';
import { MusicosController } from './musicos.controller';
import { Musico } from './musico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Musico])],
  providers: [MusicosService],
  controllers: [MusicosController],
})
export class MusicosModule {}

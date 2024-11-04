import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { MusicosModule } from 'src/musicos/musicos.module';
import { MusicosService } from 'src/musicos/musicos.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
        secret: process.env.HASH || "UHSUDHK38DSUHDSKJDUSBCBUUH3",
        signOptions: { expiresIn: '1h' },
    }),
    MusicosModule,
     
],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());

  app.useGlobalPipes(new ValidationPipe());

  const configs = new DocumentBuilder()
    .setTitle('Gerenciamento de Banda API')
    .setDescription('API para gerenciamento de escala de músicos')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, configs);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.port);
}
bootstrap();

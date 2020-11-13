import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

import { AppConfigService } from './config/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfigService = app.get(AppConfigService);

  /**
   * This will cause class-validator to use the nestJS module resolution,
   * the fallback option is to spare our self from importing all the
   * class-validator modules to nestJS
   */
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const options = new DocumentBuilder()
    .setTitle('API for the microservice related to the user auth.')
    .setDescription('The Gandalf api describe routes to get, create, edit or remove LocalAccounts and users entities.\nThis is API alos provide token')
    .setVersion('1.0')
    .addTag('health')
    .addTag('local')
    .addTag('well-known')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true,
    }),
  );
  await app.listen(appConfigService.port);
}

bootstrap();

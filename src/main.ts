import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Validation
  app.useGlobalPipes(new ValidationPipe())

  const configService = app.get(ConfigService)

  // Getting PORT Number From ENV File
  await app.listen(configService.get('PORT'));
}
bootstrap();
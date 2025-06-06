import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const PORT: string = app.get(ConfigService).getOrThrow('PORT');
  await app.listen(PORT ?? 3001);
}

bootstrap()
  .then()
  .catch((err) => console.log(`Bootstrap error: ${err}`));

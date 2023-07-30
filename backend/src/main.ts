import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import ley from 'ley';
import requestIp from 'request-ip';
import { createAdminUser } from './user/create-initial-user';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  ); // enable validation for our nest app

  await ley.up({
    cwd: './src/database/',
    dir: 'migrations',
    driver: 'postgres',
  });

  app.use(requestIp.mw());
  app.enableCors({
    origin: ['http://localhost/', 'http://159.203.4.57/'],
  });
  await createAdminUser();
  await app.listen(8080);
}
bootstrap();

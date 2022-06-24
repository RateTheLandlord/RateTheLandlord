import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import ley from 'ley';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await ley.up({
    cwd: './src/database/',
    dir: 'migrations',
    driver: 'postgres',
  });

  await app.listen(5000);
}
bootstrap();

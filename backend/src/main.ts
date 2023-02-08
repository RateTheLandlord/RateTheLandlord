import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import ley from 'ley';
import requestIp from 'request-ip';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await ley.up({
    cwd: './src/database/',
    dir: 'migrations',
    driver: 'postgres',
  });

  app.use(requestIp.mw());
  app.enableCors({
    origin: ['http://localhost/', 'http://159.203.4.57/'],
  });
  await app.listen(5000);
}
bootstrap();

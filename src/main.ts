import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    methods: 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  });
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(
    new PrismaClientExceptionFilter(httpAdapter, {
      P2000: { statusCode: 400 },
      P2002: { statusCode: 409 },
      P2003: { statusCode: 409 },
      P2025: { statusCode: 404 },
    }),
  );

  app.enableCors({
    origin: 'http://localhost:5173',
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    methods: 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

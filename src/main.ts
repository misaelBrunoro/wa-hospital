import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { SENTRY_DSN, VERSION, NODE_ENV } from './settings';
import { ApplicationModule } from './modules';
import { ValidationPipe } from '@nestjs/common';
import { ExceptionFilter } from './modules/common/filters/exception';
import * as sentry from '@sentry/node';

sentry.init({
  dsn: SENTRY_DSN,
  environment: NODE_ENV,
  release: VERSION,
});

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ExceptionFilter(httpAdapter));

  const swaggerOptions = new DocumentBuilder()
    .setTitle('wa hospital')
    .setDescription('WA HOSPITAL API')
    .setVersion(`1.${VERSION}`)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);

  SwaggerModule.setup('/swagger', app, document);

  const server = await app.listen(process.env.PORT || 3000);
  server.setTimeout(300000);

  process.on('unhandledRejection', (reason, promise) => {
    console.error(reason);
    console.log(promise);
  });

  process.on('uncaughtException', (err) => {
    console.error(err);
  });

  process.on('SIGTERM', async () => {
    await app.close();
    process.exit(0);
  });
}

bootstrap().catch((err) => console.error(err));

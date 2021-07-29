import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { REQUEST_BODY_LIMIT, VERSION } from './settings';
import { ApplicationModule } from './modules';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    ApplicationModule,
  );
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.enableCors();
  app.use(json({ limit: REQUEST_BODY_LIMIT }));
  app.use(urlencoded({ extended: true, limit: REQUEST_BODY_LIMIT }));
  app.useGlobalPipes(new ValidationPipe());

  const swaggerOptions = new DocumentBuilder()
    .setTitle('wa hospital')
    .setDescription('WA HOSPITAL API')
    .setVersion(`1.${VERSION}`)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);

  SwaggerModule.setup('/swagger', app, document);

  const server = await app.listen(process.env.PORT || 3000);
  server.setTimeout(300000);
}

bootstrap();

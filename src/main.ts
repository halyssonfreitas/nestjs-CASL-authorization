import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));
  swagger(app)
  await app.listen(3000);
}
bootstrap();

function swagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('CASL example')
    .setDescription('The CASL example description')
    .setVersion('1.0')
    .addBasicAuth()
    .addBearerAuth()
    .addTag('API')
    .addTag('Auth')
    .addTag('User')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

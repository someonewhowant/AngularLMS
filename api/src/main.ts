import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Глобальный префикс API
  app.setGlobalPrefix('api');

  // Глобальный Exception Filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // Глобальный Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // автоматически удаляет поля, которых нет в DTO
      transform: true, // автоматически преобразует payload в инстанс DTO
      forbidNonWhitelisted: true, // выдает ошибку, если переданы лишние поля
    }),
  );

  // Настройка Swagger
  const config = new DocumentBuilder()
    .setTitle('LMS Platform API')
    .setDescription('Документация для API образовательной платформы (LMS)')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // Доступ к swagger по адресу /api/docs

  // Включаем CORS для фронтенда
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

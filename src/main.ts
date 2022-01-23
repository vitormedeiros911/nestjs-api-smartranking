import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { AllExceptionsFilter } from './shared/filters/exception.filter';
import { LoggingInterceptor } from './shared/middlewares/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const httpAdapter = app.get(HttpAdapterHost);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      skipMissingProperties: true,
    }),
  );
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  const config = new DocumentBuilder()
    .setTitle('Smart Ranking')
    .setDescription('API da aplicação Smart Ranking')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  fs.writeFileSync('./swagger.json', JSON.stringify(document));
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Smart Ranking',
  });

  await app.listen(configService.get('PORT'));
}
bootstrap();

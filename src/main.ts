import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { AllExceptionsFilter } from './shared/exception.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const httpAdapter = app.get(HttpAdapterHost);

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  const config = new DocumentBuilder()
    .setTitle('Smart Ranking')
    .setDescription('API da aplicação Smart Ranking')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Smart Ranking',
  });

  await app.listen(configService.get('PORT'));
}
bootstrap();

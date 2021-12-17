import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { fastifyHelmet } from 'fastify-helmet';
//import fastifyCsrf from 'fastify-csrf';
import { TokenInterceptor } from '../src/helper/token.interceptor';
import { AuthGuard } from './guard/auth.guard';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await app.setGlobalPrefix('/api');
  await app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion:'1'
  });
  //await app.register(fastifyCsrf);
  await app.register(fastifyHelmet , {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },

  });
  await app.useGlobalInterceptors(new TokenInterceptor());
  await app.useGlobalGuards(new AuthGuard());
  const config = new DocumentBuilder()
  .setTitle('Survey Listing')
  .setDescription('Survey Listing MicroService')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}

bootstrap();

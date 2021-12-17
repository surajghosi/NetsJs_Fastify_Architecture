import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '../src/config/configuration'
import { validationSchema } from '../src/config/validation';

@Module({
  imports: [ArticleModule,
    ConfigModule.forRoot({ 
      envFilePath: `src/config/env/${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [configuration],
      validationSchema
   }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

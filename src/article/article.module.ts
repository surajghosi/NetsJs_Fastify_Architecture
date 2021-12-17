import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { articleProviders } from './article.providers';
//import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [],
    controllers: [ArticleController],
    providers: [],
})
export class ArticleModule {}

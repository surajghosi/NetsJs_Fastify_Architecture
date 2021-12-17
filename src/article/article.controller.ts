import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ArticleDto } from './dto/article.dto';
//import { ArticleService } from './article.service';
import { Article } from './interfaces/article.interface';

@Controller('article')
export class ArticleController {
  //  constructor(private readonly articleService: ArticleService) {}
  constructor() {}
    @Get()
         async findAll(): Promise<string> {
       // return this.articleService.findAll();
        return "this is test api sample";
    }
}

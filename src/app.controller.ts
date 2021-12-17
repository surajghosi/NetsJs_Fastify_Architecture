import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { TokenInterceptor } from './helper/token.interceptor';
import { AuthGuard } from './guard/auth.guard';
import logger from '../src/helper/logger';
import { ApiTags } from '@nestjs/swagger';


@Controller('APP')
 @ApiTags('APP')
//@UseGuards(AuthGuard)//
//@UseInterceptors(TokenInterceptor)
export class AppController {
  constructor(private readonly appService: AppService,  private configService: ConfigService) {}

  @Get()
  getHello(): string {
    
    logger.error("Something went wrong . Please try after sometime");
    console.log(this.configService.get<string>('database.username'));
    return this.appService.getHello();
  }
}

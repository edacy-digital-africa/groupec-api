import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('say/:name')
  saySafia(@Param('name') name: string, @Query('lastName') lastName: string) {
    return `Hello ${name} ${lastName}`;
  }

  @Post('register')
  register(@Body() data: any) {
    return data;
  }
}

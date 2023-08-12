import { Controller, Get, Post,HttpCode, HttpStatus, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { ShopService } from './services/shop/shop.service';
import { RecieptGuard } from './shop.guard';
import { UseGuards } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly shopService: ShopService
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @HttpCode(HttpStatus.OK)
  @Post('/post_payment')
  postPayment(@Body() TransactionDto: Record<string, any>): Promise<String | null> {
    const prms = this.shopService.postPayment(TransactionDto);
    console.log(prms)
    return prms;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(RecieptGuard)
  @Post('/verify_payment')
  verifyPayment(@Body() TransactionDto: Record<string, any>): Promise<String | null> {
    console.log(TransactionDto);
    return this.shopService.verifyPayment(TransactionDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/user')
  createUser(@Body() TransactionDto: Record<string, any>){
    return this.shopService.createUser(TransactionDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/shop')
  createShop(@Body() TransactionDto: Record<string, any>){
    return this.shopService.createShop(TransactionDto);
  }

}

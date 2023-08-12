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
    console.log(TransactionDto)
    const data = {
      "amount": 100,
      "currency": "NGN",
    }
    return this.shopService.postPayment(data);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(RecieptGuard)
  @Post('/verify_payment')
  verifyPayment(@Body() TransactionDto: Record<string, any>): Promise<String | null> {
    console.log(TransactionDto)
    const data = {
      "amount": 100,
      "currency": "NGN",
    }
    return this.shopService.verifyPayment(data);
  }

}

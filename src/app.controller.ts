import { Controller, Get, Post,HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ShopService } from './services/shop/shop.service';

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
  postPayment(): Promise<String | null> {
    const data = {
      "amount": 100,
      "currency": "NGN",
    }
    return this.shopService.postPayment(data);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/verify_payment')
  verifyPayment(): Promise<String | null> {
    const data = {
      "amount": 100,
      "currency": "NGN",
    }
    return this.shopService.verifyPayment(data);
  }

}

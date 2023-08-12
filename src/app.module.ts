import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopModule } from './shop/shop.module';
import { JwtModule, JwtSecretRequestType } from '@nestjs/jwt';
import { JwtConstants } from './constants';
import { ShopService } from './services/shop/shop.service';
import { PrismaService } from './services/prisma/prisma.service';

@Module({
  imports: [ShopModule, JwtModule.register({
    secret: JwtConstants.secret,
    signOptions: { expiresIn: '60s' },
    secretOrKeyProvider: (
      requestType: JwtSecretRequestType,
    ) => {
      return JwtConstants.secret;
    }
  }),],
  controllers: [AppController],
  providers: [AppService, ShopService, PrismaService],
})
export class AppModule { }

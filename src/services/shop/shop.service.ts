import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ShopService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    postPayment(data: any): Promise<String | null> {
        const str = "Meow"
        return this.jwtService.signAsync({ str });
    }

    verifyPayment(data: any): Promise<String | null> {
        const str = "Meow"
        return this.jwtService.signAsync({ str });
    }

}

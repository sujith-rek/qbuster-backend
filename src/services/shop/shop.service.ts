import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ShopService {
    constructor(private prisma: PrismaService) {}

    postPayment(data: any) : Promise<String | null>{
        const str = "Meow"
        return new Promise((resolve, reject) => {
            resolve(str)
        }
        );
    }

    verifyPayment(data: any) : Promise<String | null>{
        const str = "Meow"
        return new Promise((resolve, reject) => {
            resolve(str)
        }
        );
    }

    

}

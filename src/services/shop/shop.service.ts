import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CRUDService } from 'src/shop/crud.service';
import { Reciept } from 'src/shop/crud.service';

@Injectable()
export class ShopService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private crudService: CRUDService
    ) { }

    postPayment(data: any): Promise<String | null> {
        const recieptData: Reciept = {
            orderId: data.orderId,
            userId: data.userId,
            shopId: data.shopId,
            orderDate: data.orderDate,
            orderStatus: data.orderStatus,
            orderTotal: data.orderTotal,
        }


        this.crudService.createReciept(recieptData).then((res) => {
            console.log(res);
            const payload = {
                orderId: res.orderId,
                shopId: res.shopId,
                orderDate: res.orderDate,
                orderTotal: res.orderTotal,
            }
            return this.jwtService.signAsync(payload, { expiresIn: '3600s' });
        }).catch((err) => {
            console.log(err);
            return null;
        }
        )

        return null;


    }

    verifyPayment(data: any): Promise<String | null> {
        if(this.crudService

        return null;
    }

}

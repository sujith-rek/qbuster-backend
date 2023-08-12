import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CRUDService } from 'src/shop/crud.service';
import { Reciept } from 'src/shop/crud.service';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class ShopService {
    constructor(
        private jwtService: JwtService,
        private crudService: CRUDService
    ) { }

    postPayment(data: any): Promise<String | null> {
        const recieptData: Reciept = {
            orderId: data.orderId,
            userId: data.userId,
            shopId: data.shopId,
            orderDate: new Date(),
            orderStatus: false,
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
            const jwt = this.jwtService.signAsync(payload);
            console.log(jwt, jwt.then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            }
            ));
            return jwt;
        }).catch((err) => {
            console.log(err);
            return null;
        }
        )

        return null;


    }

    verifyPayment(data: any): Promise<String | null> {

        console.log(data);
        if(this.crudService.findUserById(data.userId))
        if(this.crudService.findShopById(data.shopId))
        

        return null;
    }

    createUser(data: any): Promise<String | null> {
        this.crudService.findUserById(data.id).then((res) => {
            if (res == null || res == undefined || res == false) {
                data.coins = 0;
                this.crudService.createUser(data).then((res) => {
                    return HttpStatus.OK;

                }).catch((err) => {
                    console.log(err);
                }
                )
            }
        }).catch((err) => {
            console.log(err);
        }
        )
        return null;
    }

    createShop(data: any): Promise<String | null> {
        this.crudService.findShopById(data.id).then((res) => {
            if (res == null || res == undefined || res == false) {
                this.crudService.createShop(data).then((res) => {
                    return HttpStatus.OK;

                }).catch((err) => {
                    console.log(err);
                }
                )
            }
        }).catch((err) => {
            console.log(err);
        }
        )
        return null;
    }



}

import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/services/prisma/prisma.service";

@Injectable()
export class CRUDService {
    constructor(private readonly prisma: PrismaService) { }

    async createUser(data: User) {
        return await this.prisma.user.create({ data });
    }

    async createShop(data: Shop) {
        return await this.prisma.shop.create({ data });
    }

    async createReciept(data: Reciept) {
        
        return await this.prisma.reciept.create({ data });
    }

    async findUserById(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: id },
        });
        if (!user) {
            return false;
        }
        return true;
    }

    async findShopById(id: number) {
        const shop = await this.prisma.shop.findUnique({
            where: { id: id },
        });
        if (!shop) {
            return false;
        }
        return true;
    }

    async updateCoins(id: string, coins: number) {
        return await this.prisma.user.update({
            where: { id: id },
            data: { coins: coins },
        });
    }

    async updateRecieptStatus(orderId: string, status: boolean) {
        return await this.prisma.reciept.update({
            where: { orderId: orderId },
            data: { orderStatus: status },
        });
    }

    async findRecieptById(orderId: string) {
        const reciept = await this.prisma.reciept.findUnique({
            where: { orderId: orderId },
        });
        if (!reciept) {
            return false;
        }
        return reciept;
    }

    


}


export type User = {
    id: string;
    name: string;
    email: string;
    phone: number;
    coins: number;
}

export type Shop = {
    id: number;
    name: string;
    address: string;
}

export type Reciept = {
    orderId: string;
    userId: string;
    shopId: number;
    orderDate: Date;
    orderTotal: number;
    orderStatus: boolean;
}    

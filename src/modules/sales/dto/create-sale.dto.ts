import { IsNotEmpty, IsNumber, IsUUID, IsEnum } from 'class-validator';
import { PaymentMethod } from '@prisma/client';

export class CreateSaleDto {
    @IsUUID()
    productId: string;

    @IsUUID()
    storeId: string;

    @IsUUID()
    shiftId: string;

    @IsUUID()
    userId: string;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsNumber()
    @IsNotEmpty()
    sellingPrice: number;

    @IsEnum(PaymentMethod)
    paymentMethod: PaymentMethod;
}


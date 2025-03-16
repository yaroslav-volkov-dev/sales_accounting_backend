import { IsNotEmpty, IsNumber, IsUUID, IsEnum } from 'class-validator';
import { PaymentMethod } from '@prisma/client';

export class CreateSaleDto {
    @IsNumber()
    @IsNotEmpty()
    productId: number;

    @IsNumber()
    @IsNotEmpty()
    storeId: number;

    @IsNumber()
    @IsNotEmpty()
    shiftId: number;

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


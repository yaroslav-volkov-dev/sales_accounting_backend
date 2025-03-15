import { IsNotEmpty, IsNumber, IsString, IsUUID, IsEnum } from 'class-validator';
import { PaymentMethod } from '@prisma/client';

export class CreateSaleDto {
    @IsUUID()
    productId: string;

    @IsUUID()
    storeId: string;

    @IsUUID()
    shiftId: string;

    @IsUUID()
    profileId: string;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsEnum(PaymentMethod)
    paymentMethod: PaymentMethod;
}


import { IsNotEmpty, IsNumber, IsString, IsUUID, IsEnum } from 'class-validator';

export class CreateSaleDto {
    @IsUUID()
    productId: string;

    @IsUUID()
    @IsNotEmpty()
    storeId: string;

    @IsUUID()
    @IsNotEmpty()
    shiftId: string;

    @IsUUID()
    @IsNotEmpty()
    profileId: string;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsEnum(PaymentMethod)
    @IsNotEmpty()
    paymentMethod: PaymentMethod;
}


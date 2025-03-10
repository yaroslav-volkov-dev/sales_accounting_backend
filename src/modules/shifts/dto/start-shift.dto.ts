import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class StartShiftDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  @IsNotEmpty()
  storeId: number;
}

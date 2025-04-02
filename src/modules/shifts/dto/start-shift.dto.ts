import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class StartShiftDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  storeId: string;
}

import { IsNotEmpty, IsUUID } from 'class-validator';

export class CloseShiftDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}

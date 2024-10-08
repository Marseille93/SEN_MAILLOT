import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateJerseySizesDto {
  @IsString()
  @IsNotEmpty()
  size: string;

  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @IsNumber()
  @IsNotEmpty()
  maillotId: number;
}

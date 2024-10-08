import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommandeDto {
  @IsNotEmpty()
  dateCom: Date;

  @IsString()
  @IsNotEmpty()
  etat: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreatePicturesDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsNumber()
  @IsNotEmpty()
  maillotId: number;
}

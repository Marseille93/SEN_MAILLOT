import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMaillotDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number; // ID de la catégorie

  @IsNumber()
  @IsNotEmpty()
  equipeId: number; // ID de l'équipe
}

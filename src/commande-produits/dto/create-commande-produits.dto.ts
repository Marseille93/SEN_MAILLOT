import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateCommandeProduitsDto {
  @IsNotEmpty()
  @IsNumber()
  commandeId: number;

  @IsNotEmpty()
  @IsNumber()
  maillotId: number;

  @IsNotEmpty()
  @IsString()
  taille: string;

  @IsNotEmpty()
  @IsNumber()
  quantite: number;

  @IsOptional()
  @IsString()
  playerName?: string;

  @IsOptional()
  @IsString()
  playerNumber?: string;
}

import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class LivraisonDto {
  @IsNotEmpty()
  @IsDate()
  dateLivraison: Date;

  @IsNotEmpty()
  @IsString()
  etat: string;
}

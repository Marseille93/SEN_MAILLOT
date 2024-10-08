import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEquipeDto {
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  logoUrl: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}

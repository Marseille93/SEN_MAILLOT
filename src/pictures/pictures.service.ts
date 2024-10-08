import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pictures } from './entities/pictures.entity';
import { Repository } from 'typeorm';
import { Maillots } from 'src/maillots/entities/maillots.entity';
import { CreatePicturesDto } from './dto/create-pictures.dto';

@Injectable()
export class PicturesService {
  constructor(
    @InjectRepository(Pictures)
    private readonly picturesRepository: Repository<Pictures>,

    @InjectRepository(Maillots)
    private readonly maillotsRepository: Repository<Maillots>,
  ) {}

  async addPicture(createPicturesDto: CreatePicturesDto): Promise<Pictures> {
    const { url, maillotId } = createPicturesDto;

    // On vérifie si le maillot existe
    const maillot = await this.maillotsRepository.findOne({
      where: { id: maillotId },
    });
    if (!maillot) {
      throw new Error('Maillot not found');
    }

    // Création d'une nouvelle image (Picture)
    const picture = this.picturesRepository.create({
      url,
      maillots: maillot,
    });

    // Sauvegarde dans la base de données
    return this.picturesRepository.save(picture);
  }
}

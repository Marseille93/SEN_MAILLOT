import { Body, Controller, Post } from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { CreatePicturesDto } from './dto/create-pictures.dto';
import { Pictures } from './entities/pictures.entity';

@Controller('pictures')
export class PicturesController {
  constructor(private readonly picturesService: PicturesService) {}

  @Post()
  async addPicture(
    @Body() createPicturesDto: CreatePicturesDto,
  ): Promise<Pictures> {
    return this.picturesService.addPicture(createPicturesDto);
  }
}

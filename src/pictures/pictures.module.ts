import { Module } from '@nestjs/common';
import { PicturesController } from './pictures.controller';
import { PicturesService } from './pictures.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pictures } from './entities/pictures.entity';
import { Maillots } from 'src/maillots/entities/maillots.entity';

@Module({
  controllers: [PicturesController],
  providers: [PicturesService],
  imports: [TypeOrmModule.forFeature([Pictures, Maillots])],
})
export class PicturesModule {}

import { Module } from '@nestjs/common';
import { MaillotsController } from './maillots.controller';
import { MaillotsService } from './maillots.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Maillots } from './entities/maillots.entity';
import { Categories } from 'src/categories/entities/categories.entity';
import { Equipes } from 'src/equipes/entities/equipes.entity';
import { JerseySize } from 'src/jersey-sizes/entities/jersey-sizes.entity';
import { Pictures } from 'src/pictures/entities/pictures.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [MaillotsController],
  providers: [MaillotsService],
  imports: [
    TypeOrmModule.forFeature([
      Maillots,
      Categories,
      Equipes,
      Pictures,
      JerseySize,
    ]),
    MulterModule.register({
      dest: './uploads', // Dossier de destination des fichiers uploadés
    }),
  ],
})
export class MaillotsModule {}

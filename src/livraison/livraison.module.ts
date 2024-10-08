// livraison.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LivraisonController } from './livraison.controller';
import { LivraisonService } from './livraison.service';
import { Livraison } from './entities/livraison.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Livraison])],
  controllers: [LivraisonController],
  providers: [LivraisonService],
})
export class LivraisonModule {}

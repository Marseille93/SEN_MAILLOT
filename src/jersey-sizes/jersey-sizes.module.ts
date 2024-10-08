import { Module } from '@nestjs/common';
import { JerseySizeController } from './jersey-sizes.controller';
import { JerseySizeService } from './jersey-size.service';
import { JerseySize } from './entities/jersey-sizes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Maillots } from 'src/maillots/entities/maillots.entity';

@Module({
  controllers: [JerseySizeController],
  providers: [JerseySizeService],
  imports: [TypeOrmModule.forFeature([Maillots, JerseySize])],
})
export class JerseySizesModule {}

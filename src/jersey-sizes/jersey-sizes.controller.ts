import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { JerseySizeService } from './jersey-size.service';
import { CreateJerseySizesDto } from './dto/create-JerseySizes.dto';
import { JerseySize } from './entities/jersey-sizes.entity';

@Controller('jersey-sizes')
export class JerseySizeController {
  constructor(private readonly jerseySizeService: JerseySizeService) {}

  // Endpoint pour créer une nouvelle taille de maillot
  @Post()
  async create(
    @Body() createJerseySizeDto: CreateJerseySizesDto,
  ): Promise<JerseySize> {
    return this.jerseySizeService.create(createJerseySizeDto);
  }

  // Endpoint pour récupérer toutes les tailles de maillots
  @Get()
  async findAll(): Promise<JerseySize[]> {
    return this.jerseySizeService.findAll();
  }
  async getStockByMaillotId(
    @Param('maillotId', ParseIntPipe) maillotId: number,
  ): Promise<JerseySize[]> {
    return this.jerseySizeService.getStockByMaillotId(maillotId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.jerseySizeService.remove(id);
  }
}

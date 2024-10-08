import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EquipesModule } from './equipes/equipes.module';
import { CommandesModule } from './commandes/commandes.module';
import { CategoriesModule } from './categories/categories.module';
import { AvisModule } from './avis/avis.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaillotsModule } from './maillots/maillots.module';
import { PicturesModule } from './pictures/pictures.module';
import { AuthModule } from './auth/auth.module';
import { JerseySizesModule } from './jersey-sizes/jersey-sizes.module';
import { CommandeProduitsModule } from './commande-produits/commande-produits.module';
import { LivraisonModule } from './livraison/livraison.module';
import * as config from '../config.json';

@Module({
  imports: [
    UsersModule,
    EquipesModule,
    CommandesModule,
    CategoriesModule,
    AvisModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.DB_HOST,
      port: parseInt(config.DB_PORT, 10) || 3306,
      username: config.DB_USERNAME,
      password: config.DB_PASSWORD,
      database: config.DB_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    MaillotsModule,
    PicturesModule,
    AuthModule,
    JerseySizesModule,
    CommandeProduitsModule,
    LivraisonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

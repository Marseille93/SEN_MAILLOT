import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001', // Remplacez par l'URL de votre frontend Next.js
    credentials: true, // Autoriser les cookies si nécessaire
  });
  await app.listen(3000);
}
bootstrap();

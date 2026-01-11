/**
 * main.ts (Bootstrap)
 *
 * Entry point of the NestJS application.
 *
 * Responsibilities:
 * - Creates and initializes the NestJS app with AppModule
 * - Enables CORS for the frontend URLs (local dev and live deployment)
 * - Starts listening on port 3000
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for your frontend origin
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://books-inventory-gamma.vercel.app',
    ], // frontend URLs
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();

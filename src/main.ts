import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  app.enableCors(); // barcha originlarga ruxsat beradi

  const uploadPath = join(__dirname, '..', '..', 'uploads', 'foods');
  if (!existsSync(uploadPath)) {
    mkdirSync(uploadPath, { recursive: true });
    console.log(`📂 Created folder: ${uploadPath}`);
  }

  app.useStaticAssets(join(__dirname, '..', '..', 'uploads', 'foods'), {
    prefix: '/uploads/foods',
    setHeaders: (res, path) => {
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    },
  });

  const config = app.get(ConfigService);
  const port = config.get<number>('PORT') ?? 3000;
  await app.listen(port, () => {
    console.log(`Server: http://localhost:${port}`);
  });
}
bootstrap();

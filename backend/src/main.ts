import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  const port = configService.get<number>('port');

  await app.listen(port ?? 3000, () => {
    console.log(`Server is running on port ${port}`);
  });
}
bootstrap();

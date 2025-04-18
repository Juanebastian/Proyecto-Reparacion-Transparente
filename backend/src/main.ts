import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express'; // ✅ Asegúrate de importar esto

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); // ✅ Tipo específico

  // 🔥 Habilitar CORS para Angular
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 📂 Servir la carpeta 'uploads' de forma pública
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads', // Accesible en http://localhost:3000/uploads/archivo.pdf
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportsModule } from './reports/reports.module';
import { ComplaintsModule } from './complaints/complaints.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/reparacion_transparente'),
    AuthModule, 
    UsersModule, ReportsModule, ComplaintsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

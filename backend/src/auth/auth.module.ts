import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy'; //  Importar estrategia

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }), // Registrar estrategia JWT
    JwtModule.register({
      secret: 'yourSecretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy], //  Incluir JwtStrategy en providers
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy], //  Exportar JwtStrategy si lo usas en otros módulos
})
export class AuthModule {}

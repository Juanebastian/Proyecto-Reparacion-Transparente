import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user?.rol !== 'admin') {
      throw new ForbiddenException('Acceso denegado: se requiere rol de administrador');
    }

    return true;
  }
}

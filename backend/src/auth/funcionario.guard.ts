import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class FuncionarioGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user?.rol !== 'funcionario') {
      throw new ForbiddenException('Acceso denegado: se requiere rol de funcionario');
    }

    return true;
  }
}

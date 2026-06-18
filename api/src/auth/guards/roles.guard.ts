import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../common/enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Если роли для маршрута не заданы, доступ разрешен всем авторизованным пользователям
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    
    // Пользователь должен существовать (JwtAuthGuard должен отработать перед этим гардом)
    if (!user || !user.role) {
      return false;
    }

    // Проверяем, есть ли роль пользователя в списке разрешенных ролей
    return requiredRoles.includes(user.role);
  }
}

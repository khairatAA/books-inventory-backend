/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY } from './roles.decorator';

// Define the shape of the authenticated user object
interface AuthUser {
  userId: string;
  roles: string[];
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get roles required by the resolver using the custom @Roles() decorator
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If no roles are required, allow access
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // Convert GraphQL context to standard request object
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    // Strongly type the user
    const user = req.user as AuthUser | undefined;

    if (!user || !user.roles) {
      // If user is missing or has no roles, deny access
      throw new ForbiddenException('Access denied: No roles found');
    }

    // Check if the user has at least one of the required roles
    const hasRole = user.roles.some((role) => requiredRoles.includes(role));
    if (!hasRole) {
      throw new ForbiddenException('Access denied: Insufficient role');
    }

    return true; // user is allowed
  }
}

import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * Custom decorator to mark required roles on a resolver
 * Example: @Roles('admin')
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

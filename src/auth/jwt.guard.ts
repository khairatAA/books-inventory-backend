/**
 * GqlAuthGuard
 *
 * Custom JWT authentication guard for GraphQL endpoints.
 * Extends NestJS Passport AuthGuard and overrides getRequest()
 * to extract the HTTP request from the GraphQL execution context.
 *
 * Ensures that GraphQL resolvers can use @UseGuards(GqlAuthGuard)
 * to protect endpoints.
 */

import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

// Extend the Nest Passport JWT guard for GraphQL
@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  // Override getRequest to extract the request from GraphQL context
  getRequest(context: ExecutionContext): Request {
    // Create a GraphQL execution context from the standard ExecutionContext
    const ctx = GqlExecutionContext.create(context);

    // Explicitly type the request as Express Request
    const req = ctx.getContext<{ req: Request }>().req;

    return req;
  }
}

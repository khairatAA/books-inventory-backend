import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express'; // Import the Express Request type

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

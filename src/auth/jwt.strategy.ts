/**
 * JwtStrategy
 *
 * Passport JWT strategy for validating Auth0-issued JSON Web Tokens (JWTs).
 *
 * - Uses jwks-rsa to fetch public keys from Auth0 for signature verification.
 * - Configures audience and issuer based on environment variables.
 * - Only accepts RS256-signed tokens.
 *
 * The `validate` method attaches a user object to request.user,
 * including userId and roles.
 */

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';

// Define the expected shape of JWT payload
interface JwtPayload {
  sub: string; // Auth0 user ID
  'https://books-api.yourdomain.com/roles'?: string[]; // Optional roles claim
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() as () => string,

      // Use Auth0 JWKS endpoint to verify JWT signatures
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true, // cache signing keys to reduce network requests
        rateLimit: true, // limit number of requests per minute
        jwksRequestsPerMinute: 5, // max 5 requests per minute
        // Dynamically build JWKS URI from environment variable
        jwksUri: `https://${configService.get<string>('AUTH0_DOMAIN')}/.well-known/jwks.json`,
      }),

      // Audience is your API identifier in Auth0
      audience: configService.get<string>('AUTH0_AUDIENCE'),

      // JWT issuer is your Auth0 domain
      issuer: `https://${configService.get<string>('AUTH0_DOMAIN')}/`,

      // Only accept RS256 algorithm
      algorithms: ['RS256'],
    });
  }

  validate(payload: JwtPayload) {
    // Return a user object that will be attached to request.user
    return {
      userId: payload.sub,
      // Give everyone the 'admin' role
      roles: ['admin'],
      // roles: payload['https://books-api.yourdomain.com/roles'] ?? [],
    };
  }
}

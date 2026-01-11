import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';

// Define the expected shape of JWT payload
interface JwtPayload {
  sub: string; // Auth0 user ID
  'https://myapp.com/roles'?: string[]; // Optional roles claim
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

  // Strongly typed validation method
  validate(payload: JwtPayload) {
    // Return a user object that will be attached to request.user
    return {
      userId: payload.sub,
      roles: payload['https://myapp.com/roles'] ?? [],
    };
  }
}

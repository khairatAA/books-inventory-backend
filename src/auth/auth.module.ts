/**
 * AuthModule
 *
 * This module sets up authentication in the application.
 * It imports PassportModule for NestJS authentication strategies
 * and provides the JwtStrategy for validating JWT tokens.
 *
 * Exports PassportModule so other modules can use guards like JwtAuthGuard.
 */

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule],
  providers: [JwtStrategy],
  exports: [PassportModule],
})
export class AuthModule {}

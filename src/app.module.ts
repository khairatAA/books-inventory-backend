/**
 * AppModule
 *
 * Root module of the NestJS application.
 *
 * Responsibilities:
 * - Sets up TypeORM with SQLite and auto-loaded entities
 * - Configures environment variables via ConfigModule
 * - Configures GraphQL with Apollo driver and auto-generated schema
 * - Imports feature modules: BooksModule and AuthModule
 * - Registers global GraphQL resolvers (AppResolver)
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      autoLoadEntities: true,
      synchronize: false,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      playground: true,
    }),
    BooksModule,
    AuthModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}

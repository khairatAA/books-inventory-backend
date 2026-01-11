/**
 * BooksModule
 *
 * Encapsulates all book-related functionality:
 * - Registers Book entity with TypeORM
 * - Provides BooksService for business logic
 * - Provides BooksResolver for GraphQL endpoints
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BooksService } from './book.service';
import { BooksResolver } from './book.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BooksService, BooksResolver],
})
export class BooksModule {}

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Book } from './book.entity';
import { BooksService } from './book.service';
import { GqlAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  /**
   * Query: Get all books
   * Protected by JWT: any authenticated user can access
   */
  @Query(() => [Book], { description: 'Get all books' })
  @UseGuards(GqlAuthGuard)
  books(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  /**
   * Query: Get a single book by ID
   * Protected by JWT: any authenticated user can access
   */
  @Query(() => Book, { nullable: true, description: 'Get a single book by ID' })
  @UseGuards(GqlAuthGuard)
  book(
    @Args('id', { type: () => Int, description: 'ID of the book' }) id: number,
  ): Promise<Book | null> {
    return this.booksService.findOne(id);
  }

  /**
   * Mutation: Create a new book
   * Protected by JWT: any authenticated user can create books
   */
  @Mutation(() => Book, { description: 'Create a new book' })
  @UseGuards(GqlAuthGuard)
  createBook(
    @Args('name', { description: 'Name of the book' }) name: string,
    @Args('description', { description: 'Description of the book' })
    description: string,
  ): Promise<Book> {
    return this.booksService.create(name, description);
  }

  /**
   * Mutation: Update an existing book
   * Protected by JWT + RolesGuard: only users with 'admin' role can update
   */
  @Mutation(() => Book, { description: 'Update an existing book' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('admin')
  updateBook(
    @Args('id', { type: () => Int, description: 'ID of the book to update' })
    id: number,
    @Args('name', { nullable: true, description: 'New name of the book' })
    name?: string,
    @Args('description', {
      nullable: true,
      description: 'New description of the book',
    })
    description?: string,
  ): Promise<Book> {
    return this.booksService.update(id, name, description);
  }

  /**
   * Mutation: Delete a book by ID
   * Protected by JWT + RolesGuard: only users with 'admin' role can delete
   */
  @Mutation(() => Boolean, { description: 'Delete a book by ID' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('admin')
  deleteBook(
    @Args('id', { type: () => Int, description: 'ID of the book to delete' })
    id: number,
  ): Promise<boolean> {
    return this.booksService.remove(id);
  }
}

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Book } from './book.entity';
import { BooksService } from './book.service';

@Resolver(() => Book) // Tells GraphQL that this resolver is for the Book type
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  /**
   * GraphQL query to get all books
   * Returns an array of Book objects
   */
  @Query(() => [Book], { description: 'Get all books' })
  books(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  /**
   * GraphQL query to get a single book by ID
   * Returns Book object or null if not found
   */
  @Query(() => Book, { nullable: true, description: 'Get a single book by ID' })
  book(
    @Args('id', { type: () => Int, description: 'ID of the book' }) id: number,
  ): Promise<Book | null> {
    return this.booksService.findOne(id);
  }

  /**
   * GraphQL mutation to create a new book
   * Accepts name and description as arguments
   * Returns the newly created Book object
   */
  @Mutation(() => Book, { description: 'Create a new book' })
  createBook(
    @Args('name', { description: 'Name of the book' }) name: string,
    @Args('description', { description: 'Description of the book' })
    description: string,
  ): Promise<Book> {
    return this.booksService.create(name, description);
  }

  /**
   * GraphQL mutation to update an existing book
   * Accepts ID and optional name/description
   * Returns the updated Book object
   * Throws NotFoundException if book does not exist
   */
  @Mutation(() => Book, { description: 'Update an existing book' })
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
   * GraphQL mutation to delete a book by ID
   * Returns true if deletion was successful
   */
  @Mutation(() => Boolean, { description: 'Delete a book by ID' })
  deleteBook(
    @Args('id', { type: () => Int, description: 'ID of the book to delete' })
    id: number,
  ): Promise<boolean> {
    return this.booksService.remove(id);
  }
}

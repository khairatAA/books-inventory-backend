import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  /**
   * Get all books
   */
  findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  /**
   * Get a single book by ID
   * Returns null if not found
   */
  findOne(id: number): Promise<Book | null> {
    return this.bookRepository.findOneBy({ id });
  }

  /**
   * Create a new book
   */
  create(name: string, description: string): Promise<Book> {
    const book = this.bookRepository.create({ name, description });
    return this.bookRepository.save(book);
  }

  /**
   * Update an existing book
   * Throws NotFoundException if the book does not exist
   */
  async update(id: number, name?: string, description?: string): Promise<Book> {
    const book = await this.findOne(id);

    // If book not found, throw 404 error
    if (!book) throw new NotFoundException(`Book with ID ${id} not found`);

    // Only update fields if provided
    if (name !== undefined) book.name = name;
    if (description !== undefined) book.description = description;

    return this.bookRepository.save(book);
  }

  /**
   * Delete a book by ID
   * Returns true if deletion was successful
   */
  async remove(id: number): Promise<boolean> {
    const result = await this.bookRepository.delete(id);

    // result.affected can be null or undefined, so default to 0
    return (result.affected ?? 0) > 0;
  }
}

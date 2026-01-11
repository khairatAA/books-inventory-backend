/**
 * Book Entity
 *
 * Represents the Book table in the database and the GraphQL Book object type.
 *
 * Fields:
 * - id: Auto-generated primary key
 * - name: Name of the book
 * - description: Description of the book
 *
 * Used by TypeORM for database mapping and by GraphQL for API schema.
 */

import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity()
export class Book {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;
}

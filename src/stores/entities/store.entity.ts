// src/stores/store.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Book } from '../../books/entities/book.entity';

@Entity()
export class Store {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    location: string;

    @ManyToMany(() => Book, (book) => book.stores)
    books: Book[];
}
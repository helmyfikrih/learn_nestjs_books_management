// src/books/book.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Store } from '../stores/store.entity';

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    year: number;

    @ManyToOne(() => Store, (store) => store.books)
    store: Store;
}
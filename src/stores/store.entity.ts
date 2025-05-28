// src/stores/store.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Book } from '../books/book.entity';

@Entity()
export class Store {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    location: string;

    @OneToMany(() => Book, (book) => book.store)
    books: Book[];
}
// src/books/book.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
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

    @ManyToMany(() => Store, (store) => store.books)
    @JoinTable() // Menentukan tabel pivot
    stores: Store[];
}
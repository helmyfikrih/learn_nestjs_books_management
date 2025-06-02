// src/books/book.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Store } from '../../stores/entities/store.entity';
import { User } from 'src/auth/entities/user.entity';

@Entity()
export class Book {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    year: number;

    @Column({
        nullable: true
    })
    image: string

    @ManyToMany(() => Store, (store) => store.books)
    @JoinTable() // Menentukan tabel pivot
    stores: Store[];

    @ManyToOne(() => User, (user) => user.id)
    user: User

    @Column({
        type: "uuid"
    })
    userId: string

    @CreateDateColumn()
    readonly createdAt!: Date

    @UpdateDateColumn()
    readonly updatedAt!: Date

}
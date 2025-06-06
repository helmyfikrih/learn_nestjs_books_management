import { Book } from 'src/books/entities/book.entity';

export class StoreWithBooksDto {
    id: string;
    name: string;
    location: string;
    books: Book[];
    totalBooks?: number; // opsional, tergantung entity kamu
}

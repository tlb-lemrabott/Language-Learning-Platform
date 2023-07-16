import { Injectable } from '@angular/core';
import { Book } from './books/books.component';
import { Language } from './languages/languages.component';
import { BookService } from './book.service';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class LanguagebooksService {

  books: Book[] = [];
  languages: Language[] = [];
  offset: number = 0;
  count: number = 3;

  constructor(private bookService: BookService, private languageService: LanguageService) { }

  getAllBooks(languageId: string) {
    this.bookService.getAll(languageId, this.offset, this.count).subscribe((books) => {
      this.books = books;
    });
  }

  getAllLanguages() {
    this.languageService.getAll(this.offset, this.count).subscribe((languages) => {
      this.languages = languages;
    });
  }

  getBook(languageId: string, bookId: string) {
    return this.bookService.getOne(languageId, bookId);
  }



  deleteBook(languageId: string, bookId: string){
   return this.bookService.deleteOne(languageId, bookId);
  }

  addBook(languageId: string, book: Book){
    return this.bookService.addOne(languageId, book);
  }

  updateBook(languageId: string, bookId: string, book: Book){
    return this.bookService.updateOne(languageId, bookId, book);
  }

}

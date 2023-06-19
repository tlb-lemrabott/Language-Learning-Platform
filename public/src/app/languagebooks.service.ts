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

  constructor(private bookService: BookService, private languageService: LanguageService) { }

  getAllBooks(languageId: string) {
    this.bookService.getAll(languageId).subscribe((books) => {
      this.books = books;
    });
  }

  getAllLanguages() {
    this.languageService.getAll().subscribe((languages) => {
      this.languages = languages;
    });
  }


  
}

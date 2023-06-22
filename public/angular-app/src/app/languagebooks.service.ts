import { Injectable, OnInit } from '@angular/core';
import { Book } from './books/books.component';
import { Language } from './languages/languages.component';
import { BookService } from './book.service';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class LanguagebooksService{

  books: Book[] = [];
  languages: Language[] = [];
  offset: number = 0;
  count: number = 2;

  constructor(private bookService: BookService, private languageService: LanguageService) { }
  

  getAllBooks(languageId: string) {
    this.bookService.getAll(languageId).subscribe((books) => {
      this.books = books;
    });
  }

  getAllLanguages() {
    this.languageService.getAll(this.offset, this.count).subscribe((languages) => {
      this.languages = languages;
    });
  }
  
}

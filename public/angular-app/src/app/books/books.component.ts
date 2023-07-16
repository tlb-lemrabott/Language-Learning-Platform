import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { ActivatedRoute } from '@angular/router';
import { LanguagebooksService } from '../languagebooks.service';

export class Book {
  #_id!: string;
  #title!: string;
  #author!: string;
  #price!: number;

constructor(id: string, title: string, author: string, price: number) {
  this._id = id;
  this.title = title;
  this.author = author;
  this.price = price;
}

  get _id(){ return this.#_id; };
  get title(){ return this.#title; };
  get author(){ return this.#author; };
  get price(){ return this.#price; };
  set _id(id: string){ this.#_id = id; };
  set title(title: string){ this.#title = title; };
  set author(author: string){ this.#author = author; };
  set price(price: number){ this.#price = price; };
}

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit{
  books: Book[] = [];
  offset: number = 0;
  count: number = 4;
  languageId = this.route.snapshot.params['languageId'];
  constructor(
    private bookService: BookService, 
    private route: ActivatedRoute, 
    private languageBooks: LanguagebooksService
  ) {}
  
  
  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    
    this.bookService.getAll(this.languageId, this.offset, this.count);
  }

}

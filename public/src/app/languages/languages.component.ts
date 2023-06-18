import { Component } from '@angular/core';
import { LanguageService } from '../language.service';

export class Language{
  #_id!: string;
  #name!: string;
  #countries!: string[];
  #books!: {
    title: string,
    author: string,
    price: number
  };

  constructor(id: string, name: string, countries: string[], books: {title: string; author: string; price: number;}){
    this._id = id;
    this.name = name;
    this.countries = countries;
    this.books = books;
  }

  get _id(){return this.#_id;};
  get name(){return this.#name;};
  get countries(){return this.#countries;};
  get books(){return this.#books;};
  set _id(id: string){this.#_id = id;};
  set name(name: string){this.#name = name;};
  set countries(countries: string[]){this.#countries = countries;};
  set books(books: {title: string; author: string; price: number;}){this.#books = books;};
}

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent {
  languages: Language[] = [];
  constructor(private languageService: LanguageService){}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.languageService.getAll().subscribe((languages) => {
      this.languages = languages;
      console.log(languages);
    });
  }



}

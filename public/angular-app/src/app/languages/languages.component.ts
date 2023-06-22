import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../language.service';
import { Location } from '@angular/common';

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
export class LanguagesComponent implements OnInit{
  languages: Language[] = [];
  loginError: string[] = [];
  showPopup: boolean = false;
  authorized: boolean = false;
  errorMessage: string = 'Unauthorized resource !';
  offset: number = 0;
  count: number = 3;
  previousDisenable: boolean = true;
  nextDisenable: boolean = false;
  showForm: boolean = false;
  showUpdateForm: boolean = false;
  listSize!: number;
  selectedOption!: number;

  constructor(private languageService: LanguageService, private location: Location){}

  ngOnInit(): void {
    this.getAll();
    this.getTotalCount();
  }

  getAll(){
    this.loginError = [];
    this.showPopup = false;

    this.languageService.getAll(this.offset, this.count).subscribe(
      (languages) => {
        this.authorized = true
        this.languages = languages;
        console.log(languages);
      },
      (error) => {
        console.log('error: ', error);
        this.loginError.push(this.errorMessage);
        this.showPopup = true;
        this.authorized = false;
      }
      );
  };


  getTotalCount() {
    this.languageService.getTotalCount().subscribe({
      next: (size) => {
        this.listSize = size;
        console.log(size);
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  previousPage(){
    this.offset = this.offset - this.count;
    if (this.offset <= 0) {
      this.previousDisenable = true;
    }
    this.nextDisenable = false;
    this.getAll();
  }

  nextPage(){
    this.offset = this.offset + this.count;
    if (this.offset + this.count >= this.listSize) {
      this.nextDisenable = true;
    }
    this.previousDisenable = false;
    this.getAll();
  }

  onSelectChange(selectedValue: any) {
    this.count = parseInt(selectedValue.value);
    this.getAll();
  }

  closePopup() {
    this.showPopup = false;
  }

  updateLanguage(language: any){

  }

  deleteLanguage(language: any){

  }

  showLanguageForm() {
    this.showForm = true;
  }

  showUpdateLanguageForm(id:string){
    this.addIdToCurrentUrl(id);
    this.showUpdateForm = true;
  }

  addIdToCurrentUrl(id: string) {
    const currentUrl = this.location.path();
    const updatedUrl = `${currentUrl}/${id}`;
    this.location.go(updatedUrl);
  }

}

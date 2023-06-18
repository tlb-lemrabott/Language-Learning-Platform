import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../language.service';
import { ActivatedRoute } from '@angular/router';
import { Language } from '../languages/languages.component';
import { Book } from '../books/books.component';
import { LanguagebooksService } from '../languagebooks.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit{
  language!: Language;
  books: Book[] = [];
  constructor(
    private languageSevice: LanguageService, 
    private route: ActivatedRoute, 
    public languageBooks: LanguagebooksService
  ){
    this.language = new Language("", "", [], {title:"", author:"", price:0});
  }

  ngOnInit(): void {
    this.getOne();
  }

  getOne(){
    const languageId = this.route.snapshot.params["languageId"];
    this.languageSevice.getOne(languageId).subscribe((language) => {
      this.language = language;
      console.log("language = " + language);
      this.languageBooks.getAllBooks(languageId);
    });
  }
  
  

}

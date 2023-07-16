import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../language.service';
import { ActivatedRoute } from '@angular/router';
import { Language } from '../languages/languages.component';
import { Book } from '../books/books.component';
import { LanguagebooksService } from '../languagebooks.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit{
  language!: Language;
  books: Book[] = [];
  previousDisenable: boolean = false;
  nextDisenable: boolean = false;
  listSize!: number;
  showForm: boolean = false;
  showFormUpdate: boolean = false;
  languageId = this.route.snapshot.params["languageId"];
  bookId: string = '';

  constructor(
    private languageSevice: LanguageService, 
    private route: ActivatedRoute, 
    public languageBooksService: LanguagebooksService,
    private location: Location
  ){
    this.language = new Language("", "", [], {title:"", author:"", price:0});
  }

  ngOnInit(): void {
    this.getOne();
  }

  getOne(){
    this.languageSevice.getOne(this.languageId).subscribe((language) => {
      this.language = language;
      this.languageBooksService.getAllBooks(this.languageId);
    });
  }
  offset = this.languageBooksService.offset;
  count = this.languageBooksService.count;
  
  previousPage(){
    this.offset = this.offset - this.count;
    if (this.offset <= 0) {
      this.previousDisenable = true;
    }
    this.nextDisenable = false;
    this.languageBooksService.getAllBooks(this.languageId);
  }

  nextPage(){
    this.offset = this.offset + this.count;
    if (this.offset + this.count >= this.listSize) {
      this.nextDisenable = true;
    }
    this.previousDisenable = false;
    this.languageBooksService.getAllBooks(this.languageId);
  }


  
  deleteBook(idBook:string){
    this.languageBooksService.deleteBook(this.languageId, idBook).subscribe({
      next: deletedBook =>  {
      this.languageBooksService.getAllBooks(this.languageId);
        console.log(deletedBook)
      },
      error: err=> console.log(err)
    })

  }



  addIdToCurrentUrl(idBook:string) {
      const currentUrl = this.location.path();
      const updatedUrl = `${currentUrl}/${idBook}`;
      this.location.go(updatedUrl);
  }


  showBookUpdateForm(idBook:string){
    this.showFormUpdate = true;
    this.showForm = false;

    this.addIdToCurrentUrl(idBook);
  }
  showBookAddOneForm(){
    this.showForm = true;
    this.showFormUpdate=false;
          
    if (this.showForm) {
      console.log("adding id to url");
      const currentUrl = this.location.path();
      const updatedUrl = currentUrl.match(/\/languages\/.*$/) ? currentUrl.replace(/\/[^/]*$/, "") : currentUrl;
      this.location.go(updatedUrl);
    }
  }

  // removeIdFromUrl() {
  //   const currentUrl = this.location.path();
  //   const updatedUrl = currentUrl.replace(/\/\w+$/, '');
  //   this.location.replaceState(updatedUrl);
  // }
}

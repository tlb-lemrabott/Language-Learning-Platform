import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../books/books.component';
import { ActivatedRoute } from '@angular/router';
import { LanguagebooksService } from '../languagebooks.service';
import { Language } from '../languages/languages.component';
import { Location } from '@angular/common';


@Component({
  selector: 'app-language-form',
  templateUrl: './language-form.component.html',
  styleUrls: ['./language-form.component.css']
})
export class LanguageFormComponent {
  book!: Book;
  language!: Language;
  onUpdate: boolean = false;
  languageId = this.route.snapshot.params["languageId"];
  bookId!:string;
  constructor(
    private languageBookService: LanguagebooksService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location:Location
    ){
  }

  reactiveForm!: FormGroup;

  ngOnInit(): void {
    console.log("new instance");
    
    this.reactiveForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      price: ['']
    });

    this.getOne() 

  }
  getOne() {
    this.route.params.subscribe(params => {

      const currentUrl = this.location.path();
      const urlParts = currentUrl.split('/');
      const languageId = urlParts[2];
      this. bookId = urlParts[3];

      if (this.bookId) {
        this.onUpdate = true;
        console.log('First Parameter:',this. bookId);

        this.languageBookService.getBook(languageId,this.bookId).subscribe({
          next: (data: any) => {
            this.reactiveForm.setValue({
              title: data.title,
              author: data.author,
              price: data.price
            });

            console.log(data);
          },
          error: (err) => {
            console.log(err);
          }
        })

      } else {
        console.log('No parameter found in the URL.');
      }
    });
  }

  filledBook() {
    this.book = new Book("",
      this.reactiveForm.value.title,
      this.reactiveForm.value.author,
      this.reactiveForm.value.price
    );
  }

  onSubmit() {
    if(this.onUpdate){
      this._submitUpdate();
    }else{
      this._submitAddOne();
    }
  }

  _submitAddOne(){
    if (this.reactiveForm.valid) {
      this.filledBook();
      console.log("languageId Addone= " + this.languageId, this.book._id)
      this.languageBookService.addBook(this.languageId, this.book).subscribe((createdBook)=> {
        console.log(createdBook);
      })
    }
  }

  _submitUpdate(){
    if (this.reactiveForm.valid) {
      this.filledBook();
      console.log("languageId = " + this.languageId, this.bookId)
      console.log("bookId = " + this.bookId)
      this.languageBookService.updateBook(this.languageId, this.bookId, this.book).subscribe((updatedBook)=> {

        this.removeIdFromUrl();
        this.onUpdate=false;
        console.log(updatedBook);
      });
    }
  }


    removeIdFromUrl() {
    const currentUrl = this.location.path();
    const updatedUrl = currentUrl.replace(/\/\w+$/, '');
    this.location.replaceState(updatedUrl);
  }
}

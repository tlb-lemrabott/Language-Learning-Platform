import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Language } from '../languages/languages.component';
import { LanguageService } from '../language.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-languages-form',
  templateUrl: './languages-form.component.html',
  styleUrls: ['./languages-form.component.css']
})
export class LanguagesFormComponent implements OnInit {
  
  language!: Language;
  countries!: string[];
  onUpdate: boolean = false;
  constructor(
    private languageService: LanguageService, 
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute, 
    private location: Location
    ){
    //this.languageService = new Language("", "", [], books: {title: "", author: "", price: 0,});
  }

  reactiveForm!: FormGroup;

  ngOnInit(): void {
    console.log("new instance");
    
    this.reactiveForm = this.formBuilder.group({
      name: ['', Validators.required],
      countries: [''],
      bookTitle: ['', Validators.required],
      bookAuthor: [''],
      bookPrice: ['']
    });

    this.getOne();
  }

  getOne() {
    this.route.params.subscribe(params => {

      const currentUrl = this.location.path();
      const urlParts = currentUrl.split('/');
      const firstParam = urlParts[2];

      if (firstParam) {
        this.onUpdate = true;
        console.log('First Parameter:', firstParam);

        this.languageService.getOne(firstParam).subscribe({
          next: (data: any) => {
            this.reactiveForm.setValue({
              name: data.name,
              countries: data.countries,
              bookTitle: data.books[0].title,
              bookAuthor: data.books[0].author,
              bookPrice: data.books[0].price
            });

            console.log("data - lg = " + this.language);
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


  filledLanguage() {
    this.language = new Language("",
      this.reactiveForm.value.name,
      this.countries,
      {
        title: this.reactiveForm.value.bookTitle,
        author: this.reactiveForm.value.bookAuthor,
        price: parseInt(this.reactiveForm.value.bookPrice)
      }
    );
  }

  onSubmit() {
    if(this.onUpdate){
      this._submitUpdate();
    }else{
      this._submitAddOne();
    }

    this.onUpdate = false;
  }

  _submitAddOne(){
    if (this.reactiveForm.valid) {
      this.transformString();
      this.filledLanguage();
      this.languageService.addOne(this.language).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  _submitUpdate(){
    const currentUrl = this.location.path();
    const urlParts = currentUrl.split('/');
    const firstParam = urlParts[2];

    if (this.reactiveForm.valid) {
      this.transformString();
      this.filledLanguage();
      this.language._id= firstParam;
      this.languageService.partialUpdateOne(this.language).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  transformString(): void {
    this.countries = this.reactiveForm.value.countries.toString()
    .split(',').map((country: string) => country.trim());
  }


  

}

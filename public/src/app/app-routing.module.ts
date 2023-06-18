import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LanguagesComponent } from './languages/languages.component';
import { LanguageComponent } from './language/language.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BooksComponent } from './books/books.component';
import { BookComponent } from './book/book.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path:'languages', component: LanguagesComponent},
  {path:'languages/:languageId', component: LanguageComponent},
  {path:'languages/:languageId/books', component: BooksComponent},
  {path:'languages/:languageId/books/:bookId', component: BookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

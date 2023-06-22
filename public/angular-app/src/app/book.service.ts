import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Book } from './books/books.component';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  baseURL: string = environment.apiUrl;

  public getAll(languageId: string): Observable<Book[]>{
    return this.http.get<Book[]>(this.baseURL+`/languages/${languageId}/books`);
  }

  public getOne(id: string): Observable<Book>{
    return this.http.get<Book>(this.baseURL+`/books/${id}`)
  }
}

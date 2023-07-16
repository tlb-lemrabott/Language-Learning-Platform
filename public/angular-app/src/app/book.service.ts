import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Book } from './books/books.component';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  baseURL: string = environment.apiUrl;

  public getAll(languageId: string, offset: number, count: number): Observable<Book[]> {
    const params = new HttpParams().set('offset', offset.toString()).set('count', count.toString());
    return this.http.get<Book[]>(this.baseURL + `/languages/${languageId}/books`, { params });
  }
  

  public getOne(languageId: string, bookId: string,): Observable<Book>{
    return this.http.get<Book>(this.baseURL+`/languages/${languageId}/books/${bookId}`);
  }

  public deleteOne(languageId: string, bookId: string,): Observable<Book>{
    return this.http.delete<Book>(this.baseURL+`/languages/${languageId}/books/${bookId}`);
  }

  public addOne(languageId: string, book: Book): Observable<Book>{
    return this.http.put<Book>(this.baseURL+`/languages/${languageId}/books`, {
      title: book.title,
      author: book.author,
      price: book.price
    })
  }

  public updateOne(languageId: string, bookId: string, book: Book): Observable<Book>{
    return this.http.patch<Book>(this.baseURL+`/languages/${languageId}/books/${bookId}`, {
      title: book.title,
      author: book.author,
      price: book.price
    });
  }

  getTotalCount(languageId: string): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/languages/${languageId}/books/count/size`);
  }

}

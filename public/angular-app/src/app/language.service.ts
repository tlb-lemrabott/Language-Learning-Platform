import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../environments/environment.development';
import { Language } from './languages/languages.component';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  baseURL: string = environment.apiUrl;

  public getAll(offset: number, count: number): Observable<Language[]> {
    if (this.authService.isAuthenticated()) {
      const url = `${this.baseURL}/languages?offset=${offset}&count=${count}`;
      return this.http.get<Language[]>(url);
    } else {
      // Handle unauthorized access:
      return new Observable<Language[]>(observer => observer.error('Unauthorized'));
    }
  }

  public getOne(id: string): Observable<Language>{
    return this.http.get<Language>(this.baseURL+`/languages/${id}`)
  }

  public addOne(language: Language): Observable<Language>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(language);
    
    return this.http.post<Language>(this.baseURL+`/languages`,  
    {
      name: language.name,
      countries: language.countries,
      books: [language.books],

    },{headers}
    )
  }

  partialUpdateOne(language: Language): Observable<Language>{
    return this.http.patch<Language>(this.baseURL+`/languages/${language._id}`,  
    {
      name: language.name,
      countries: language.countries,
      books: [language.books],
    })
  }
  
  getTotalCount(): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/languages/count/size`);
  }


  public deleteOne(id: string): Observable<Language>{
    return this.http.delete<Language>(this.baseURL+`/languages/${id}`)
  }

}

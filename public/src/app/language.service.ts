import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment.development';
import { Language } from './languages/languages.component';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  baseURL: string = environment.apiUrl;

  public getAll(): Observable<Language[]>{
    if (this.authService.isAuthenticated()) {
      return this.http.get<Language[]>(this.baseURL+'/languages');
    }else {
      // Handle unauthorized access :
      return new Observable(observer => observer.error('Unauthorized'));
    }
    
  }

  public getOne(id: string): Observable<Language>{
    return this.http.get<Language>(this.baseURL+`/languages/${id}`)
  }
  
}

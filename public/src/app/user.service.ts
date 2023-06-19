import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './register/register.component';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  baseURL: string = environment.apiUrl;

  public register(user: User): Observable<User> {
    return this.http.post<User>(this.baseURL + `/register`,
      {
        name: user.name,
        username: user.username,
        password: user.password
      }
    );
  }



  public login(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseURL}/login`, {
      username: user.username,
      password: user.password
    });
  }


  
}

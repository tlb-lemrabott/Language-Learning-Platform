import { Component, OnInit } from '@angular/core';
import { User } from '../register/register.component';
import { UserService } from '../user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user!: User;
  reactiveForm!: FormGroup;
  loginError: string = '';

  constructor(private userService: UserService, private authService: AuthenticationService, private router: Router){
    this.user = new User("", "", "", "", "");
  }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSubmit(){
    this.user.username = this.reactiveForm.value.username;
    this.user.password = this.reactiveForm.value.password;
    
    this.userService.login(this.user).subscribe(
      (userLogin) => {
        this.authService.setToken(userLogin.token);
        // Handle successful login
        this.router.navigate(['/']);
      },
      (error) => {
        this.loginError = 'Invalid username or password.';
      }
    );
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
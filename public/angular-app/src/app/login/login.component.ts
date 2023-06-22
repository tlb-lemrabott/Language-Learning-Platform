import { Component, OnInit } from '@angular/core';
import { User } from '../register/register.component';
import { UserService } from '../user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  loginError: string[] = [];
  showPopup: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.user = new User('', '', '', '', '');
  }

  ngOnInit(): void {
    this.reactiveForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.loginError = [];
    this.showPopup = false;

    if (this.reactiveForm.valid) {
      this.user.username = this.reactiveForm.value.username;
      this.user.password = this.reactiveForm.value.password;

      this.userService.login(this.user).subscribe(
        (userLogin) => {
          this.authService.setToken(userLogin.token);
          // Handle successful login
          this.router.navigate(['/']);
        },
        (error) => {
          console.log('err: ' + error.message);
          this.loginError.push('Invalid username or password.');
          this.showPopup = true;
        }
      );
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  closePopup() {
    this.showPopup = false;
  }

}

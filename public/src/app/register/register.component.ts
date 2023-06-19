import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';

export class User{
  #_id!: string;
  #name!: string;
  #username!: string;
  #password!: string;
  #token!: string;

  constructor(id: string, name: string, username: string, password: string, token: string){
    this._id = id;
    this.name = name;
    this.username = username;
    this.password = password;
    this.token = token;
  }

  get _id(){return this.#_id;};
  get name(){return this.#name;};
  get username(){return this.#username;};
  get password(){return this.#password;};
  get token(){return this.#token;};
  set _id(id: string){this.#_id = id;};
  set name(name: string){this.#name = name;};
  set username(username: string){this.#username = username;};
  set password(password: string){this.#password = password;};
  set token(token: string){this.#token = token;};
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  user!: User;

  constructor(private userService: UserService){
    this.user = new User("", "", "", "", "");
  }

  reactiveForm!: FormGroup;

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      name: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSubmit(){
    this.user.name = this.reactiveForm.value.name;
    this.user.username = this.reactiveForm.value.username;
    this.user.password = this.reactiveForm.value.password;

    this.userService.register(this.user).subscribe((createdUser) => { 
      console.log(createdUser);
    })
  }

}

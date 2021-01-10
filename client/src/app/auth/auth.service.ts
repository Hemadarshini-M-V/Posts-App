import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { authData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  signUp(email, password) {
    const user: authData = {
      email: email,
      password: password
    };
    this.http.post("http://localhost:3000/users/signup", user).subscribe(result => {
      console.log(result);
    });
  }
}

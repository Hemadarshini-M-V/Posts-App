import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService) {}

  pageLoaded: boolean = false;

  ngOnInit(): void {
    this.pageLoaded = true;
  }

  onSignUp(signupForm: NgForm) {
    if(signupForm.invalid) {
      return;
    }
    this.authService.signUp(signupForm.value.email,
      signupForm.value.password);
  }

}

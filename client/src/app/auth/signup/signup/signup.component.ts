import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() {}

  pageLoaded: boolean = false;

  ngOnInit(): void {
    this.pageLoaded = true;
  }

  onSignUp(signupForm: NgForm) {
    console.log(signupForm.value);
  }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() {}

  pageLoaded: boolean = false;

  ngOnInit(): void {
    this.pageLoaded = true;
  }

  onLogin(loginForm: NgForm) {
    console.log(loginForm.value);
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  submitted = false;
  emailAddress:string;

  constructor() { }

  ngOnInit() {}

  onSubmit() {
    this.submitted = true;
  }

}

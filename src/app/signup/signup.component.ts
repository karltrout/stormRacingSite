import {
  Component,
  OnInit,
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from '@angular/core';

import { User } from 'app/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [
    trigger('revealSignup', [
      state('reveal', style({
        height: '*',
        opacity: 1,
        visibility: 'visible'
      })),
      state('hide', style({
        height: 0,
        opacity: 0,
        visibility: 'hidden'
      })),
      transition('reveal => hide',
        animate(250,
          keyframes([
            style({ opacity: 1, height: '*', offset: 0 }),
            style({ opacity: 0, height: '*', offset: 0.3 }),
            style({ opacity: 0, height: 0, offset: 1.0 })
          ]))),
      transition('hide => reveal',
        animate(250,
          keyframes([
            style({ opacity: 0, height: 0, offset: 0 }),
            style({ opacity: 0, height: '*', offset: 0.3 }),
            style({ opacity: 1, height: '*', offset: 1.0 })
          ])
        ))
    ]),
  ]
})
export class SignupComponent implements OnInit {

  submitted = false;
  myShowForm: string = 'hide';

  user: User;

  constructor() {

  }

  ngOnInit() {
    this.user = new User();
  }

  onSubmit() {

    this.submitted = true;
    console.log("Attempting to Submit the user " + this.user.email);
  }

  showForm() {
    if (this.myShowForm === 'hide') this.myShowForm = 'reveal';
    else this.myShowForm = 'hide';

    console.log("Atempting to " + this.myShowForm + " the Signup Form ");
  }

}

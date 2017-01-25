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

import { User } from 'app/entities/user';
import { UserAccountService } from 'app/services/user-account.service';

const EMAIL_EXIST_MSG: string = "Email Address exists";
const INVALID_EMAIL_MSG: string = "Email Address invalid";

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
  backendServiceStatusUp = true;
  myShowForm: string = 'hide';
  messageExists: boolean = false;
  message: string = "error message";

  user: User;
  existingUser: User[];
  userAccountService: UserAccountService;

  constructor(userAccountService: UserAccountService) {
    this.userAccountService = userAccountService;
  }

  ngOnInit() {
    this.user = new User();
    this.backendServiceStatusUp = this.userAccountService.statusUp;
  }

  onSubmit() {
    console.log("Attempting to Submit the user " + this.user.email);

    if (!this.user.email.match('^.+@.+\..+$')) {
      this.displayMessage(INVALID_EMAIL_MSG);
      return;
    }

    this.userAccountService.createUserAccount(this.user).then(
      function(response) {
        console.log("the response id returned from CreateUserAccount() is :" + response.getId());
      }
    ).catch(
      error => {
        console.log("REJECT Reason: -> " + error.status);

        switch (error.status) {
          case 302:
            this.displayMessage(EMAIL_EXIST_MSG);
            break;
          case 400:
            this.displayMessage(INVALID_EMAIL_MSG);
            break;
          case 404:
            break;
          default:
        }
      }
      );
  }

  doesUserExist() {
    console.log("Attempting to Check if user " + this.user.email + " Exists.");

    this.messageExists = false;

    this.userAccountService.getUserByEmail(this.user.email).then(
      function(response) {
        this.displayMessage(EMAIL_EXIST_MSG);
      }
    ).catch(
      error => {
        switch (error.status) {
          case 400:
            this.displayMessage(INVALID_EMAIL_MSG);
            break;
          case 404:
          console.log("Email does not exist. Proceed.")
            break;
          default:
        };
      });
  }

  showForm() {
    if (this.myShowForm === 'hide') this.myShowForm = 'reveal';
    else this.myShowForm = 'hide';
  }

  displayMessage(message: string) {
    console.log("Message: " + message);
    this.message = message;
    this.messageExists = true;

  }

}

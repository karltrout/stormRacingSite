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
import { UserAccountService } from 'app/user-account.service';

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
  existingUser: User[];
  userAccountService: UserAccountService;

  constructor(userAccountService: UserAccountService) {
    this.userAccountService = userAccountService;
  }

  ngOnInit() {
    this.user = new User();
  }

  onSubmit() {

    this.submitted = true;
    console.log("Attempting to Submit the user " + this.user.email);

    this.userAccountService.getUserByEmail(this.user.email).then(
      function(response) {
        let u = response;// as User;
        console.log("the response is :" + response.email);
        let test = u instanceof User;
        console.log ("the Response is an InstanceOf User: "+test);
        console.log("the u user is : "+u.getId());
      }
    ).catch(error => console.log("there was a problem." + error));

  }


  doesUserExist() {

    console.log("Attempting to Check if user " + this.user.email + " Exists.");

  }
  showForm() {
    if (this.myShowForm === 'hide') this.myShowForm = 'reveal';
    else this.myShowForm = 'hide';

    console.log("Atempting to " + this.myShowForm + " the Signup Form ");
  }

}

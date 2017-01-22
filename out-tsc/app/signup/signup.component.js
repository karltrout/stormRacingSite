var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { User } from 'app/entities/user';
import { UserAccountService } from 'app/services/user-account.service';
var SignupComponent = (function () {
    function SignupComponent(userAccountService) {
        this.submitted = false;
        this.myShowForm = 'hide';
        this.userAccountService = userAccountService;
    }
    SignupComponent.prototype.ngOnInit = function () {
        this.user = new User();
    };
    SignupComponent.prototype.onSubmit = function () {
        this.submitted = true;
        console.log("Attempting to Submit the user " + this.user.email);
        this.userAccountService.getUserByEmail(this.user.email).then(function (response) {
            console.log("the response is :" + response.email);
        }).catch(function (error) { return console.log("there was a problem." + error); });
    };
    SignupComponent.prototype.doesUserExist = function () {
        console.log("Attempting to Check if user " + this.user.email + " Exists.");
    };
    SignupComponent.prototype.showForm = function () {
        if (this.myShowForm === 'hide')
            this.myShowForm = 'reveal';
        else
            this.myShowForm = 'hide';
        console.log("Atempting to " + this.myShowForm + " the Signup Form ");
    };
    return SignupComponent;
}());
SignupComponent = __decorate([
    Component({
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
                transition('reveal => hide', animate(250, keyframes([
                    style({ opacity: 1, height: '*', offset: 0 }),
                    style({ opacity: 0, height: '*', offset: 0.3 }),
                    style({ opacity: 0, height: 0, offset: 1.0 })
                ]))),
                transition('hide => reveal', animate(250, keyframes([
                    style({ opacity: 0, height: 0, offset: 0 }),
                    style({ opacity: 0, height: '*', offset: 0.3 }),
                    style({ opacity: 1, height: '*', offset: 1.0 })
                ])))
            ]),
        ]
    }),
    __metadata("design:paramtypes", [UserAccountService])
], SignupComponent);
export { SignupComponent };
//# sourceMappingURL=../../../../src/app/signup/signup.component.js.map
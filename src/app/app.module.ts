import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { MenuDirective } from './menu/menu.directive';
import { SignupComponent } from './signup/signup.component';
import { UserAccountService } from './user-account.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MenuDirective,
    SignupComponent ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [UserAccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }

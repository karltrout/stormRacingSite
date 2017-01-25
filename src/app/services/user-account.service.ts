import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { User }           from 'app/entities/user';
// Add the RxJS Observable operators.
import './rxjs-operators';
import { environment } from 'environments/environment'

@Injectable()
export class UserAccountService {

  private usersRootUrl = environment.REST_API;//"http://localhost:8080/users/";

  statusUp = false;

  constructor(private http: Http) {

    this.http.get(this.usersRootUrl + "/status")
      .toPromise()
      .then(this.serviceStatus)
      .catch(
        error => {
          console.log("REJECT Reason: -> " + error.status);
          this.statusUp = false;
        }
      );

  }

  private serviceStatus(response: Response) {

    this.statusUp = (response instanceof Response);
    console.log("Returned Service Status is Currently :" + this.statusUp );

  }

  getUserByEmail(email: string): Promise<User> {

    console.log("Envirnment is Prod :" + environment.production);

    return this.http.get(this.usersRootUrl + "exists?email=" + email)
      .toPromise()
      .then(this.mapUserData)
      .catch(this.errorHandling);

  }

  createUserAccount(newUser: User): Promise<User> {

    console.log("Attempting to create a new User -> " + newUser.getEmail());

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.usersRootUrl, JSON.stringify(newUser), options)
      .toPromise()
      .then(this.mapUserData)
      .catch(this.errorHandling);

  }

  private mapUserData(response: Response) {

    let responseBody = response.json() as User;
    return User.fromObject(responseBody) || {};

  }

  private errorHandling(error: any): Promise<any> {

    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;

    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.log("Service Status is Currently :"+status);
    console.log("An error occured in user uccounts service: " + errMsg);
    console.error(errMsg);
    return Promise.reject(error);

  }

}

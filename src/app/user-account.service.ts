import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { User }           from './user';
// Add the RxJS Observable operators.
import './rxjs-operators';

@Injectable()
export class UserAccountService {

  private usersRootUrl = "http://localhost:8080/users/";

  constructor(private http: Http) { }

  getUserByEmail(email: string): Promise<User> {
    return this.http.get(this.usersRootUrl + "exists?email=" + email)
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
    console.error(errMsg);
    return Promise.reject(errMsg);
  }

}

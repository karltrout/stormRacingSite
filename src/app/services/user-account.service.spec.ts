/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import {  HttpModule, Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { UserAccountService } from './user-account.service';
import { User } from 'app/entities/user';

let testUser: User = new User();
testUser.setFirstName("John");
testUser.setLastName("Doe");
testUser.setEmail("john.doe@gmail.com");

describe('UserAccountService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        UserAccountService,
        BaseRequestOptions,
         MockBackend,
         {
           provide: Http,
           deps: [MockBackend, BaseRequestOptions],
           useFactory: (backend, options) => { return new Http(backend, options); }
         },
         User
       ]
    });

  });

  it('should ...', inject([UserAccountService, MockBackend], (service: UserAccountService, backend: MockBackend) => {
    expect(service).toBeTruthy();
  }));

  describe('.getUserByEmail()', () => {
    //verify that method exists
    it('should ...', inject([UserAccountService], (service: UserAccountService) => {
      expect(service.getUserByEmail).toBeDefined();
    }));

    it('find a user by email.', inject([UserAccountService, MockBackend], (service: UserAccountService, backend: MockBackend) => {

      backend.connections.subscribe(conn => {
        conn.mockRespond(
          new Response(
            new ResponseOptions(
              {body: JSON.stringify(testUser)}
            )));
      });

      service.getUserByEmail(testUser.getEmail()).then(
        function(response) {
          expect(response.getEmail()).toEqual(testUser.getEmail())
        }
      ).catch (
        () => {
         console.log("An Error occured with Response.");
       }
      );

    }));

  });

  describe('.createUserAccount()', () => {
    //verify that method exists
    it('should ...', inject([UserAccountService], (service: UserAccountService) => {
      expect(service.createUserAccount).toBeDefined();
    }));
    //it('should call mock endpoint and return the results', ())
  });

});

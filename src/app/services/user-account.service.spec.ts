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
testUser.id = 1;

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

  it('should ...', inject([UserAccountService, MockBackend],
    (service: UserAccountService, backend: MockBackend) => {
      expect(service).toBeTruthy();
    }));

  describe('.getUserByEmail()', () => {
    //verify that method exists
    it('should ...', inject([UserAccountService], (service: UserAccountService) => {
      expect(service.getUserByEmail).toBeDefined();
    }));

    it('find a user by email.', inject([UserAccountService, MockBackend],
      (service: UserAccountService, backend: MockBackend) => {

        backend.connections.subscribe(conn => {
          conn.mockRespond(
            new Response(
              new ResponseOptions(
                { body: JSON.stringify(testUser) }
              )));
        });

        service.getUserByEmail(testUser.getEmail()).then(
          function(response) {
            expect(response.getEmail()).toEqual(testUser.getEmail())
          }
        ).catch(
          () => {
            console.log("An Error occured with Response in getUserByEmail().");
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
    it('call the mock service and return the newly created account',
      inject([UserAccountService, MockBackend], (service: UserAccountService, backend: MockBackend) => {
        //set up the mock backend response
        testUser.setId(2);
        backend.connections.subscribe(conn => {
          conn.mockRespond(
            new Response(
              new ResponseOptions(
                { body: JSON.stringify(testUser) }
              )));
        });
        //call the service expecting the complete end user account returned
        let newUser = User.fromObject(testUser);
        newUser.setId(null);
        service.createUserAccount(newUser).then(
          function(response) {
            expect(response).toBeDefined();
            expect(response.getId()).toEqual(2);
          }
        ).catch(
          () => { console.log("An Error occured with Response in createUserAccount()."); }
          );

      }));
  });

});

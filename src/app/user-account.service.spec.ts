/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import {  HttpModule, Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { UserAccountService } from './user-account.service';
import { User } from './user';

let testUser:User = new User();
testUser.setFirstName("Karl");
testUser.setLastName("Trout");
testUser.setEmail("karl.trout@gmail.com");

describe('UserAccountService',()  => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [  HttpModule  ],
      providers: [ UserAccountService, MockBackend,User ]
    });

  });


  it('should ...', inject([ UserAccountService, MockBackend ], (service: UserAccountService, backend: MockBackend) => {
    expect(service).toBeTruthy();
  }));



  describe('.getUserByEmail()',() => {

    //verify that method exists
    it('should ...',  inject([UserAccountService], (service: UserAccountService) => {
      expect(service.getUserByEmail).toBeDefined();
    }));

    it('find a user by email.', async(  inject( [UserAccountService, User], (service: UserAccountService) => {

      service.getUserByEmail(testUser.getEmail()).then(
        function(response) {
          expect(response.getEmail()).toEqual(testUser.getEmail())
        }
      ).catch();

    })));

    //it('should call mock endpoint and return the results', ())

  });

});

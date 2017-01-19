export class User {
  email:string;
  firstName:string;
  lastName:string;
//  isUser:boolean = false;

  constructor(){
  }

  getFirstName(){
    return this.firstName;
  }

  setFirstName(fname:string){
    this.firstName = fname;
  }

}

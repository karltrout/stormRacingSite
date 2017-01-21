export class User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  //  isUser:boolean = false;

  constructor() {
  }

  getId() {
    return this.id;
  }
  setId(id: number) {
    this.id = id;
  }

  getFirstName() {
    return this.firstName;
  }

  setFirstName(fname: string) {
    this.firstName = fname;
  }

  setEmail(email:string){
    this.email = email;
  }

  getEmail(){
    return this.email;
  }

  setLastName(lname: string){
    this.lastName = lname;
  }

  getLastName(){
    return this.lastName;
  }

  static fromObject(src: User) {
    var obj = new User();
    obj.firstName = src.firstName;
    obj.lastName = src.lastName;
    obj.email = src.email;
    obj.id = src.id;
    return obj;
  }

}

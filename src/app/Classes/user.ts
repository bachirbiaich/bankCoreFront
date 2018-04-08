export class User{
    _id:string;
    email:string;
    password:string;
    firstname:string;
    lastname:string;
    canVir:boolean;
    
    constructor(_id:string, firstname:string, lastname:string, email:string, password:string, canVir:boolean){
        this._id = _id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.canVir = canVir;
    }
}
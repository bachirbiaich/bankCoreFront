import { Injectable } from '@angular/core';
import { User } from '../../Classes/user';

@Injectable()
export class SessionService {

  constructor() { }

  static startSession(user:User,token:string){
    console.log(user);
    sessionStorage.setItem('user',JSON.stringify(user));
    sessionStorage.setItem('token',token);
  }

  static endSession(){
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  }

  static getToken():string{
    return sessionStorage.getItem('token');
  }

  static getLoggedInUser():User{
    if(SessionService.isLoggedIn()){
      const jsonUser = JSON.parse(sessionStorage.getItem('user'));
      return new User(jsonUser._id,jsonUser.firstname,jsonUser.lastname,jsonUser.mail,jsonUser.password);
    }
    else
      return null;
  }

  static isLoggedIn():boolean{
    if(sessionStorage.getItem('user') && sessionStorage.getItem('token'))
      return true;
    return false;
  }
}

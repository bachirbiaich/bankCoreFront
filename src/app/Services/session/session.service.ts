import { Injectable } from '@angular/core';
import { User } from '../../Classes/user';

@Injectable()
export class SessionService {

  constructor() { }

  static startSession(user: User, token: string) {
    console.log(user);
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('token', token);
  }

  static endSession() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('admin');
  }

  static getToken(): string {
    return sessionStorage.getItem('token');
  }

  static getLoggedInUser(): User {
    if (SessionService.isLoggedIn()) {
      const jsonUser = JSON.parse(sessionStorage.getItem('user'));
      return new User(jsonUser._id, jsonUser.firstname, jsonUser.lastname, jsonUser.email, jsonUser.password, jsonUser.canVir);
    } else {
      return null;
    }
  }

  static isLoggedIn(): boolean {
    if (sessionStorage.getItem('user') && sessionStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  static isAdmin(): boolean {
    if (SessionService.isLoggedIn()) {
      if (sessionStorage.getItem('admin') === 'yes') {
        return true;
      }
    }
    return false;
  }

  static setAdmin(): void {
    if (SessionService.isLoggedIn()) {
      sessionStorage.setItem('admin', 'yes');
    }
  }
}

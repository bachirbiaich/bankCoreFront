import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService extends ApiService {

  constructor(private http: HttpClient) {
    super();
   }

  login(mail: string, password: string): Observable<any> {
    const body = { email: mail, password: password};
    return this.http.post<any>(`${this.apiURI}/login`, body);
  }

  getUsers() {
    return this.http.get<any>(`${this.apiURI}/api/Users`);
  }

  checkIfIsAdmin(): Observable<any> {
    return this.http.get<any>(`${this.apiURI}/isAnAdminLoggedIn`);
  }

  getAllUser(){
    return this.http.get<any>(`${this.apiURI}/api/Users`);
  }

  authorizeUser(user): Observable<any>{
    user.canVir = !user.canVir;
    return this.http.patch<any>(`${this.apiURI}/api/Users/${user._id}`, [
      {
          "op": "replace",
          "path": "/canVir",
          "value": user.canVir
        }	
    ]);
  }
}

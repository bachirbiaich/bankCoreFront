import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService extends ApiService{

  constructor(private http:HttpClient) {
    super();
   }
  
  login(mail:string, password:string): Observable<any>{
    const body = { email: mail, password: password};
    return this.http.post<any>(`${this.apiURI}/login`, body);
  }

  checkIfIsAdmin(): Observable<any>{
    return this.http.get<any>(`${this.apiURI}/isAnAdminLoggedIn`);
  }
}

import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SessionService } from '../../../Services/session/session.service';
import { Compte } from '../../../Classes/compte';

@Injectable()
export class CompteService extends ApiService{

  constructor(private http:HttpClient) {
    super();
   }
  
  getComptes(): Observable<Array<Compte>>{
    return this.http.get<Array<Compte>>(`${this.apiURI}/api/Comptes`);
  }
}
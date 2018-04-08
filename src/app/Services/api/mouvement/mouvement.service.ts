import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Mouvement } from '../../../Classes/mouvement';

@Injectable()
export class MouvementService extends ApiService{

  constructor(private http:HttpClient) {
    super();
   }

  getMouvementsByCompteId(compte_id:string): Observable<Array<Mouvement>>{
    return this.http.get<Array<Mouvement>>(`${this.apiURI}/api/Mouvements?compte_id=${compte_id}`);
  }

}

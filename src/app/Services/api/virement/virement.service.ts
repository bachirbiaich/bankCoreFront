import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Virement } from '../../../Classes/virement';

@Injectable()
export class VirementService extends ApiService {

  constructor(private http: HttpClient) {
    super();
  }

  getVirements(): Observable<Array<Virement>> {
    return this.http.get<Array<Virement>>(`${this.apiURI}/api/Virements`);
  }

  addVirements(data): Observable<Array<Virement>> {
    const body = {
      recipient_iban: data.recipient_iban,
      date: data.date,
      montant: data.montant,
    };
    return this.http.post<Array<Virement>>(`${this.apiURI}/api/Virements`, body);

  }
}

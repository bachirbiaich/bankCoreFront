import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Compte } from '../Classes/compte';
import { Mouvement } from '../Classes/mouvement';
import { CompteService } from '../Services/api/compte/compte.service';
import { MouvementService } from '../Services/api/mouvement/mouvement.service';
import { SessionService } from '../Services/session/session.service';
import { ErrorsService } from '../Services/errors/errors.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  comptes: Array<Compte> = [];
  mouvements: Array<Mouvement> = [];
  idCompteSelectionne: string;
  soldeAVenir: number;

  constructor(private router: Router, private compteService: CompteService, private mouvementService: MouvementService) {
  }

  ngOnInit() {
    console.log("isAdmin : "+SessionService.isAdmin());
    if (!SessionService.isLoggedIn() || SessionService.isAdmin()) {
      this.router.navigate(['/login']);
    } else {
      this.compteService.getComptes()
      .subscribe(
        resp => {
          if (resp.length > 0) {
            this.comptes = resp;
            this.idCompteSelectionne = this.comptes[0]._id;
            this.loadMouvementsPasses();
            this.loadSoldeAVenir();
          } else {
            ErrorsService.addErrorOnHTML('Vous ne disposez d\'aucun compte');
          }
        },
        err => {
          ErrorsService.addErrorOnHTML('Erreur lors de la récupération des comptes');
      });
    }
  }

  loadMouvementsPasses() {
    this.loadSoldeAVenir();
    ErrorsService.clearErrorsOnHTML();
    this.mouvementService.getMouvementsByCompteId(this.idCompteSelectionne)
    .subscribe(
      resp => {
        if (resp.length > 0) {
          const dateActuelle: Date = new Date();
          // on supprime les évenements à venir
          for (let i = 0; i < resp.length; i++) {
            if (new Date(resp[i].date) > dateActuelle) {
               resp.splice(i, 1);
               i--;
            }
          }
          if (resp.length > 0) {
            this.mouvements = resp;
          } else {
            this.mouvements = [];
            ErrorsService.addErrorOnHTML('Aucun mouvement passé sur ce compte');
          }
        } else {
          this.mouvements = [];
          ErrorsService.addErrorOnHTML('Aucun mouvement sur ce compte');
        }
      },
      err => {
        ErrorsService.addErrorOnHTML('Erreur lors de la récupération des mouvements du compte');
    });
  }

  loadMouvementsAVenir() {
    ErrorsService.clearErrorsOnHTML();
    this.mouvementService.getMouvementsByCompteId(this.idCompteSelectionne)
    .subscribe(
      resp => {
        if (resp.length > 0) {
          const dateActuelle: Date = new Date();
          // on supprime les évenements passés
          for (let i = 0; i < resp.length; i++) {
            if (new Date(resp[i].date) < dateActuelle) {
               resp.splice(i, 1);
               i--;
            }
          }
          if (resp.length > 0) {
            this.mouvements = resp;
          } else {
            this.mouvements = [];
            ErrorsService.addErrorOnHTML('Aucun mouvement à venir sur ce compte');
          }
        } else {
          this.mouvements = [];
          ErrorsService.addErrorOnHTML('Aucun mouvement sur ce compte');
        }
      },
      err => {
        ErrorsService.addErrorOnHTML('Erreur lors de la récupération des mouvements du compte');
    });
  }

  private loadSoldeAVenir() {
    this.mouvementService.getMouvementsByCompteId(this.idCompteSelectionne)
    .subscribe(
      resp => {
        let soldeAvenir: number = this.getLoadedCompteById(this.idCompteSelectionne).solde.valueOf();
          const dateActuelle: Date = new Date();
          for (let i = 0; i < resp.length; i++) {
            if (new Date(resp[i].date) > dateActuelle) {
               soldeAvenir = soldeAvenir.valueOf() + (resp[i].montant.valueOf());
            }
          }
          this.soldeAVenir = soldeAvenir.valueOf();
      });
  }

  private getLoadedCompteById(_id: string): Compte {
    let compte: Compte = null;
    for (let i = 0; i < this.comptes.length; i++) {
      if (this.comptes[i]._id === _id) {
        compte = this.comptes[i];
      }
    }
    return compte;
  }

}

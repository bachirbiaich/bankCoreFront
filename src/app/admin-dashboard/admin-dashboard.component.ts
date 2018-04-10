import { Component, OnInit } from '@angular/core';
import { ErrorsService } from '../Services/errors/errors.service';
import { UserService } from '../Services/api/user/user.service';

@Component({
  selector: 'bc-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  listUsers;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getAllUser()
    .subscribe(
      resp => {
        if (resp.length > 0) {
          this.listUsers = resp;
          console.log('users', this.listUsers);
        } else {
          ErrorsService.addErrorOnHTML('La base ne contient aucun utilisateurs');
        }
      },
      err => {
        ErrorsService.addErrorOnHTML('Erreur lors de la récupération des comptes');
    });
  }

  autorize(user){
    console.log("test");
    this.userService.authorizeUser(user)
    .subscribe(
      resp => {
          console.log('resp', resp);
      },
      err => {
        ErrorsService.addErrorOnHTML('Erreur lors de la modification du compte');
    });
  }

}

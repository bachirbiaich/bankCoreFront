import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorsService } from '../Services/errors/errors.service';
import { SessionService } from '../Services/session/session.service';
import { CompteService } from '../Services/api/compte/compte.service';
import * as $ from 'jquery';
import { User } from '../Classes/user';

@Component({
  selector: 'bc-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  menuItems:any = [
    {'name':'Droits','route':'/admin/dashboard','faIconClass':'university'}
  ];

  currentRoute:string;

  user:User;

  constructor(private router: Router, private compteService: CompteService) {
    this.currentRoute = this.router.url;
    this.user = SessionService.getLoggedInUser();
  }

  ngOnInit() {
    // Jquery menu
    $(function(){
        $('#slide-submenu').on('click', function() {
              $(this).closest('.list-group').fadeOut('slide', function(){
                $('.mini-submenu').fadeIn();              });
            });
        $('.mini-submenu').on('click', function(){
            $(this).next('.list-group').toggle('slide');
            $('.mini-submenu').hide();
        });
      });
  }

  navigateTo(route: string) {
    ErrorsService.clearErrorsOnHTML();
    this.router.navigate([route]);
  }

  logout() {
    SessionService.endSession();
    ErrorsService.clearErrorsOnHTML();
    this.router.navigate(['/login']);
  }

}

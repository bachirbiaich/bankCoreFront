import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorsService } from '../Services/errors/errors.service';
import { SessionService } from '../Services/session/session.service';
import * as $ from 'jquery';
import { User } from '../Classes/user';

@Component({
  selector: 'bc-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuItems:any = [
    {'name':'Mouvements','route':'/dashboard','faIconClass':'line-chart'},
    {'name':'Virements','route':'/virements','faIconClass':'university'}
  ];

  currentRoute:string;

  user:User;

  constructor(private router: Router) {
    this.currentRoute = this.router.url;
    this.user = SessionService.getLoggedInUser();
  }

  ngOnInit() {
    //Jquery menu
    $(function(){
        $('#slide-submenu').on('click',function() {			        
              $(this).closest('.list-group').fadeOut('slide',function(){
                $('.mini-submenu').fadeIn();	
              });
              
            });
      
        $('.mini-submenu').on('click',function(){		
              $(this).next('.list-group').toggle('slide');
              $('.mini-submenu').hide();
        })
      })      
  }

  navigateTo(route:string){
    ErrorsService.clearErrorsOnHTML();
    this.router.navigate([route]);
  }

  logout(){
    SessionService.endSession();
    ErrorsService.clearErrorsOnHTML();
    this.router.navigate(['/login']);
  }

}

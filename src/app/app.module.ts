import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './Classes/Jwt/token.interceptor';
import { JwtInterceptor } from './Classes/Jwt/jwt.interceptor';
import { Router } from '@angular/router';

/*Services*/
import { ErrorsService } from './Services/errors/errors.service';
import { SessionService } from './Services/session/session.service';
import { ApiService } from './Services/api/api.service';
import { UserService } from './Services/api/user/user.service';
import { CompteService } from './Services/api/compte/compte.service';
import { MouvementService } from './Services/api/mouvement/mouvement.service';
import { VirementService } from './Services/api/virement/virement.service';

/*Components*/
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { VirementsComponent } from './virements/virements.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { OrderByPipe } from './Pipes/order-by.pipe';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'virements', component: VirementsComponent },
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MenuComponent,
    VirementsComponent,
    OrderByPipe,
    AdminDashboardComponent,
    AdminMenuComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    ErrorsService,
    SessionService,
    ApiService,
    UserService,
    CompteService,
    MouvementService,
    VirementService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
      deps: [Router]
    }],
    
  bootstrap: [AppComponent]
})
export class AppModule { }

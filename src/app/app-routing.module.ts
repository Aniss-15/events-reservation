import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { DashbordComponent } from './Components/dashbord/dashbord.component';
import { authGuard } from './guards/auth.guard';
import { HeaderComponent } from './Components/header/header.component';
//import { FrontLayoutComponent } from './Components/front-layout/front-layout.component';

const routes: Routes = [
  { path:' ', redirectTo:'login' , pathMatch:"full"},
  { path:'login', component:LoginComponent},
  { path:'signup',component:SignupComponent}, 
  { path:'dashbord',component:DashbordComponent , canActivate: [authGuard]},
  { path:'header' ,component:HeaderComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

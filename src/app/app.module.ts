import { NgModule} from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AuthService } from './Services/auth.service';
import { DashbordComponent } from './Components/dashbord/dashbord.component';
import { NgToastModule } from 'ng-angular-popup' ;// to be added
import { tokenInterceptor } from './Interceptors/token.interceptor';
import { EditUserComponent } from './Components/EditUser/edit-user/edit-user.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { SafeRecaptchaComponent } from './Components/login/safe-recaptcha/safe-recaptcha.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './Components/header/header.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashbordComponent,
    EditUserComponent,
    SafeRecaptchaComponent,
    HeaderComponent,
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, // Add this line
    AppRoutingModule,
    ReactiveFormsModule,// Add HttpClientModule here
    NgToastModule ,// to be added
    NgxCaptchaModule,
    CommonModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch(),(withInterceptors([tokenInterceptor])),),  // Add provideHttpClient() here,
    AuthService ,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable,Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl :string="https://localhost:44363/api/User/";
  private userPayload:any;

  constructor(private http: HttpClient , private router:Router , @Inject(PLATFORM_ID) private platformId: any) {
    this.userPayload =this.decodedToken();
   }
  signUp(userObj: any){
    console.log('Sending sign up request to:', `${this.baseUrl}Register`);
    console.log('User object:', userObj);
    return this.http.post<any>(`${this.baseUrl}Register`, userObj).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);  // Log the response body
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  signOut(){
      localStorage.clear();
      this.router.navigate(['login']);
  }

  login(loginObj: any){
    return this.http.post<any>(`${this.baseUrl}login`, loginObj);
  }

  storeToken(tokenValue: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      console.log('Storing token:', tokenValue);
      localStorage.setItem('token', tokenValue);
    }
  }
  getToken() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      console.log('Retrieved token:', token);
      return token;
    }
    return null;
  }

  isLogged(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken();
    if (token) {
      const decoded = jwtHelper.decodeToken(token);
      console.log('Decoded Token:', decoded);
      return decoded;
    }
    return null;
  }
  
  getfullNameFromToken() {
    if (this.userPayload) {
      console.log('Fullname (unique_name) from Token:', this.userPayload.unique_name);
      return this.userPayload.unique_name;
    }
    return null;
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }
}

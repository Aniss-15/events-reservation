import { Component, OnInit, inject , PLATFORM_ID, Inject  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup'; //make sure to import service
import { UserStoreService } from '../../Services/user-store.service';
import { DomSanitizer } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  type: string = "password";
  eyeIcon: string = "fa-eye";
  loginForm!: FormGroup;
  public resetPasswordEmail !: string;
  public isValid !: boolean ; 
  public captchaImage: any;
  private = inject(NgToastService); //inject the service

  constructor(private fb: FormBuilder,
    private auth: AuthService ,
    private router: Router ,
    private toast :NgToastService,
    private userStore:UserStoreService,
    private sanitizer: DomSanitizer,
   
    
  ) {
    }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]], // Added email validator
      Password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      recaptcha: ['', Validators.required] // Added recaptcha control
    });
  }
    

  hideShowPass(): void {
    if (this.type === 'password') {
      this.type = 'text';
      this.eyeIcon = 'fa-eye-slash';
    } else {
      this.type = 'password';
      this.eyeIcon = 'fa-eye';
    }
  }
  onLogin(): void {
    if (this.loginForm.valid) {
      console.log("Login form is valid. Form values:", this.loginForm.value);
      // Valider le CAPTCHA
      // this.captcha.validCaptcha(this.loginForm.value.Captcha).subscribe({
      //   next: (res) => {
      //     console.log("CAPTCHA validation response:", res);
          this.auth.login(this.loginForm.value).subscribe({
            next: (res: any) => {
              console.log("Login successful. Response:", res);
              this.loginForm.reset();
              this.auth.storeToken(res.token);
              const tokenPayload = this.auth.decodedToken();
              this.userStore.setFullNameFromStore(tokenPayload.unique_name);
              this.userStore.setRoleFromStore(tokenPayload.role);
              this.toast.success("Login", "SUCCESS", 5000);
              this.router.navigate(['dashbord']);
            },
            error: (err: any) => {
              console.error("Login failed. Error:", err);
              this.toast.danger("Please enter a valid email and password", "", 5000);
            }
          });
      //   },
      //   error: (err) => {
      //     console.error("CAPTCHA validation failed. Error:", err);
      //     this.toast.danger("Invalid CAPTCHA code.", "", 5000);
      //   }
      // });
    } else {
      console.warn("Login form is invalid. Checking for empty fields.");
      const champsvides = [];
      for (const field in this.loginForm.controls) {
        if (this.loginForm.controls[field].hasError('required')) {
          champsvides.push(field);
        }
      }
      
  
      if (champsvides.length > 0) {
        console.warn("Empty fields detected:", champsvides);
        this.toast.warning("WARNING", "Please fill in all required fields", 5000);
      } else {
        this.validateFormFields(this.loginForm);
      }
    }
  }
  
  
  
  private validateFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateFormFields(control);
      }
    });
  }
  checkValid(event:string){
    const value = event ;
    const pattern = /^[\w-\,]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isValid=pattern.test(value);
    return this.isValid;

  }
  ConfirmEmail(){
    if(this.checkValid(this.resetPasswordEmail)){
      console.log(this.resetPasswordEmail);
      this.resetPasswordEmail="";
      const buttonRef= document.getElementById("closeBtn");
      buttonRef?.click();
    }
  }
  


}

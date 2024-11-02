import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  constructor(private fb: FormBuilder , private auth:AuthService , private router: Router , private toast:NgToastService){

  }
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      FirstName: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ '-]+$/)]],
      LastName: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ '-]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      Numcin: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      roles:['',[Validators.required]],
    });
  }
  type:string="password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash";
  signUpForm !:FormGroup;
  
  hideShowPass() {
    if (this.type === 'password') {
      this.type = 'text';
      this.eyeIcon = 'fa-eye-slash';
    } else {
      this.type = 'password';
      this.eyeIcon = 'fa-eye';
    }
  }

  onSignup() {
    // Check if the form is valid
    if (this.signUpForm.valid) {
        // Convert Numcin to an integer
        const formValue = { ...this.signUpForm.value, Numcin: parseInt(this.signUpForm.value.Numcin, 10) };
        console.log('Converted form values:', formValue);
        console.log('Form is valid, sending sign up request');

        // Send the parsed form values
        this.auth.signUp(formValue).subscribe({
            next: (res: any) => {
                console.log('Response from server:', res);
                this.toast.success("Registred successfuly","Register",5000);
                this.signUpForm.reset();
                this.router.navigate(['/dashbord']);
            },
            error: (err: any) => {
                console.error('Error occurred:', err);
                console.log('Error details:', err); // Log the full error response
                if (err.error && err.error.message) {
                    alert(err.error.message);
                } else {
                    alert('An error occurred, please try again later.');
                }
            }
        });
    } else {
        // Check if there are empty fields
        const champsvides = [];
        for (const field in this.signUpForm.controls) {
            if (this.signUpForm.controls[field].hasError('required')) {
                champsvides.push(field);
            }
        }

        if (champsvides.length > 0) {
            alert(`not valid`);
        } else {
            this.validateFormfields(this.signUpForm);
        }
    }
}



  private validateFormfields(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control=formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});

      }else if(control instanceof FormGroup){
        this.validateFormfields(control)
      }
    })
  }

}
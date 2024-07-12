import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login', 
  imports: [FormsModule, ReactiveFormsModule,CommonModule,],  
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  @ViewChild('loginForm', { static: true }) loginForm!: NgForm;
  loginobj:Login;
  
  errorMessage: string = '';
  constructor(private http:HttpClient,private loginService: LoginService,private Authservice:AuthService,
    private router: Router ){
    this.loginobj=new Login()
   
}

onlogin(): void {
  if (!this.loginForm.valid) {
    console.error('Form is invalid');
    return;
  }

  const loginCredentials = this.loginForm.value;
console.log("emememem",this.loginForm.value.email)
this.Authservice.setLoginResponse(this.loginForm.value.email);
  this.loginService.post(loginCredentials).subscribe(
    response => {

      if (response.authenticated) {
        console.log('Login successful', response);
        this.router.navigate(['/dashboard']);
      } else {
        console.error('Login failed: Invalid credentials');
        this.errorMessage = response.message || 'Invalid email or password. Please try again.';
      }
    },
    error => {
      console.error('Login failed', error);
      this.errorMessage = 'An error occurred during login. Please try again later.';
    }
  );
}




// onSignup():void{
//   this.loginService.signpost(this.signupObj).subscribe(
//     response =>{
//       console.log('Signup succesful');
//     },
//     error=>{
//       console.error('Signup faild');
//     }
//   );

// }



navigateToRegister() {
  this.router.navigate(['/register']);
}

navigateToReset(){
  this.router.navigate(['/reset']);
}

}  

export class Login{
    
      
        email: string;
        password : string;

        constructor(){
            this.email=''
            this.password=''
        }
    
}



import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  signupObj: signup;
  constructor(private router: Router, private loginService: LoginService) {
    this.signupObj = new signup()
  }

  navigateTologin() {
    this.router.navigate(['/login']);
  }
  onSignup(): void {
    this.loginService.signpost(this.signupObj).subscribe(
      response => {
        console.log('Signup succesful');
      },
      error => {
        console.error('Signup faild');
      }
    );

  }

}
export class signup {


  username: string;
  email: string;
  phonenumber: string;
  password: string;

  constructor() {
    this.email = ''
    this.password = ''
    this.phonenumber = ''
    this.username = ''
  }

}

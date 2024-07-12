import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { ResetService } from '../services/reset.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  resetForm: FormGroup;
  otpSent: boolean = false;
  otpVerified: boolean = false;
  timer: number = 30; // initial timer value in seconds
  timerInterval: any; // to store the setInterval reference

  constructor(private fb: FormBuilder, private resetService: ResetService,private router: Router ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    
  }

  sendEmail() {
    const email = this.resetForm.get('email')?.value;
    
    if (email) {
      this.resetService.sendEmail({ to: email }).subscribe(
        response => {
          console.log('Email sent successfully', response);
          this.otpSent = true; // Update the UI to show OTP input
          this.startTimer(); // Start OTP timer
        },
        error => {
          console.error('Email sending failed', error);
        }
      );
    }
  }
  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        clearInterval(this.timerInterval);
        // Handle timeout, maybe ask user to resend OTP
      }
    }, 1000);
  }

  verifyOTP() {
    const email = this.resetForm.get('email')?.value;
    const otp = this.resetForm.get('otp')?.value;
    if (email && otp) {
      this.resetService.verifyOtp({ to: email, otp:otp }).subscribe(
        response => {
          console.log('OTP verified successfully', response);
          this.otpVerified = true;
          clearInterval(this.timerInterval); // Stop the timer once OTP is verified
        },
        error => {
          if (error.status === 403) {
            console.error('OTP verification failed: Forbidden (403). Check your backend for details.', error);
          } else {
            console.error('OTP verification failed', error);
          }
        }
      );
    }
  }

  resetPassword() {
    const email = this.resetForm.get('email')?.value;
    const newPassword = this.resetForm.get('newPassword')?.value;
    const confirmPassword = this.resetForm.get('confirmPassword')?.value;
    if (email && newPassword && confirmPassword && newPassword === confirmPassword) {
      this.resetService.resetPassword(email, newPassword).subscribe(
        response => {
          console.log('Password reset successfully');
          this.router.navigate(['/login']); 
        },
        error => {
          console.error('Password reset failed', error);
        }
      );
    }
  }
}
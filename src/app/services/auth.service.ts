import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}
  private loginResponseSubject = new BehaviorSubject<any>(null); // Use BehaviorSubject to store and emit the login response
  loginResponse$ = this.loginResponseSubject.asObservable(); // Expose as an observable for other components to subscribe to

  // Set the login response
  setLoginResponse(response: any): void {
    this.loginResponseSubject.next(response);
  }

  // Get the current login response
  getLoginResponse(): any {
    return this.loginResponseSubject.value;
  }



  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
  checkAuthentication() {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }
}

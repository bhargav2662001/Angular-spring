import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetService {
  private apiUrl = 'http://localhost:8081';
  private apiUrl1='http://localhost:8081';
  private verifyOtpUrl = `${this.apiUrl}/verify-otp`;


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
     responseType: 'text' as 'json'
  };


  constructor(private http: HttpClient) { }

  sendEmail(data: any): Observable<any> {
    console.log("Data",data)
    return this.http.post<any>(`${this.apiUrl}/send-email`, data, this.httpOptions);
  }

  verifyOtp(data:any): Observable<any> {
    return this.http.post<any>(this.verifyOtpUrl,data, this.httpOptions);
  }

  resetPassword(email: string, password: string): Observable<any> {
    const resetPasswordUrl = `${this.apiUrl}/login/email?email=${email}`;
    return this.http.put<any>(resetPasswordUrl, { password }, this.httpOptions);
  }
}

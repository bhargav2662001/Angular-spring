import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8081/login/validateLogin';
  private apiUrl1 = 'http://localhost:8081/login';

  httpOptions:any = {
    headers: new HttpHeaders({
      'Accept' : 'application/json',
      'Content-Type':'application/json',
    }),
    'responseType' : 'text'
  }

  constructor(private http: HttpClient) { }

  // post (data:any):Observable<any>{
  //   return this.http.post<any>(this.apiUrl,data,this.httpOptions);
  // }

  post(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(this.apiUrl, credentials).pipe(
      catchError(error => {
        // Handle error
        throw error;
      })
    );
  }
  
  

  signpost (data:any):Observable<any>{
    return this.http.post<any>(this.apiUrl1,data,this.httpOptions);
  }
}

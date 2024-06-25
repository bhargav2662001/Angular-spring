import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';


interface UploadPayload {
  email: string;
  filename: string;
  filetype: string;
  filedrive: string;
}

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private uploadUrl = 'http://localhost:8081/upload/upload'; // Endpoint for uploading files
  private fetchUrl = 'http://localhost:8081/upload/files'; // Endpoint for fetching files by email
  
  constructor(private http: HttpClient) {}

  // Method to upload a file
  uploadFile(payload: any): Observable<any> {
    return this.http.post(this.uploadUrl, payload);
  }

  // Method to fetch a file by email
  fetchFile(email: string): Observable<any> {
    return this.http.get<any>(`${this.fetchUrl}/${email}`);
  }
}

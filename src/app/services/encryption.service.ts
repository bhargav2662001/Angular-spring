// encryption.service.ts
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  private apiUrl2 = 'http://localhost:8081/upload/upload';
  private encryptionKey: string | undefined;
  private encryptionIv: string | undefined;

  constructor(private http: HttpClient) {
    // Initialize encryption key and IV asynchronously
    this.initEncryptionParams();
  }
  setEncryptionKey(key: string): void {
    this.encryptionKey = key;
  }

  setEncryptionIv(iv: string): void {
    this.encryptionIv = iv;
  }    
  private initEncryptionParams() {
    this.http.get<any>('/api/encryptionParams').pipe(
      catchError(error => {
        console.error('Failed to fetch encryption params', error);
        return throwError(error);
      })
    ).subscribe(params => {
      this.encryptionKey = params.encryptionKey;
      this.encryptionIv = params.encryptionIv;
    });
  }

  async encryptFileContent(fileContent: string): Promise<string> {
    await this.waitForInitialization();

    if (!this.encryptionKey || !this.encryptionIv) {
      throw new Error('Encryption key and IV must be set.');
    }

    try {
      const key = await this.importKey(this.encryptionKey);
      const iv = await this.importIv(this.encryptionIv);
      const data = new TextEncoder().encode(fileContent);

      const encryptedBuffer = await crypto.subtle.encrypt(
        { name: 'AES-CBC', iv },
        key,
        data
      );

      // Convert the encrypted buffer to a base64 string
      return btoa(String.fromCharCode(...new Uint8Array(encryptedBuffer)));
    } catch (error) {
      console.error('Encryption error', error);
      throw error; // Rethrow the error for handling in the caller
    }
  }

  private async importKey(key: string): Promise<CryptoKey> {
    const keyBuffer = new TextEncoder().encode(key);
    return crypto.subtle.importKey(
      'raw',
      keyBuffer,
      'AES-CBC',
      false,
      ['encrypt']
    );
  }

  private async importIv(iv: string): Promise<Uint8Array> {
    return new TextEncoder().encode(iv);
  }

  private async waitForInitialization(): Promise<void> {
    while (!this.encryptionKey || !this.encryptionIv) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  getEncryptionParams(): Observable<any> {
    return this.http.get<any>(this.apiUrl2);
  }
}
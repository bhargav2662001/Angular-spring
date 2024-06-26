import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../services/file-upload.service';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../environment';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  uploadForm: FormGroup;
  fetchEmail: string = '';
  selectedFile: any = null; // Use any type for simplicity, adjust as per actual file structure
  fileUrl: string | null = null;
  files: any[] = []; // Array to store fetched files
  loginResponse: any;
  constructor(private fb: FormBuilder, private uploadService: FileUploadService, private router: Router, private Authservice: AuthService) {
    this.uploadForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      file: [null, Validators.required]
    });
  }

  ngOnInit(): void {
   
    this.Authservice.loginResponse$.subscribe(response => {
      this.loginResponse = response;
      console.log('Retrieved login response in dashboard:', this.loginResponse);
    });
  }

  onFileSelected(event: any): void {
    const file: File | null = event?.target?.files?.[0] || null;
    if (file) {
      this.selectedFile = file;
      this.uploadForm.patchValue({ file: file });
    }
  }

  onSubmit(): void {
    if (this.uploadForm.invalid || !this.selectedFile) {
      console.error('Form is invalid or no file selected');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        const base64String: string = reader.result.toString().split(',')[1];
        const payload = {
          email: this.uploadForm.value.email,
          filename: this.selectedFile!.name,
          filetype: this.selectedFile!.type,
          filedrive: base64String
        };

        this.uploadService.uploadFile(payload).subscribe(
          response => {
            console.log('File uploaded successfully', response);
            this.resetForm();
          },
          error => {
            console.error('Error uploading file', error);
          }
        );
      } else {
        console.error('Failed to read file');
      }
    };
    reader.readAsDataURL(this.selectedFile);
  }

  // fetchFile(email: string): void {

  //   if (email.trim() !== '' && email.trim().length > 10) {
  //     this.router.navigate(['/fetch'], { queryParams: { emails: email }});
  //   }

  // }

  fetchFile(email: string): void {

    if (email.trim() !== '' && email.trim().length > 10) {


      console.log("vvvvvvvv",this.loginResponse)
      if (this.loginResponse === email) {

        this.router.navigate(['/fetch'], { queryParams: { emails: email } });

      } else {

        console.error('Error: Login response email does not match the provided email.');

        alert('Error: You are not authorized to fetch this file.');
      }

    } else {
      
      console.error('Error: Invalid email provided.');
    
      alert('Error: Please provide a valid email.');
    }
  }


  selectFile(file: FileDetails): void {
    this.selectedFile = file;
    this.fileUrl = 'data:' + file.filetype + ';base64,' + file.filedrive;
   
  }

  downloadSelectedFile(): void {
    if (this.selectedFile) {
      const downloadUrl = 'data:' + this.selectedFile.filetype + ';base64,' + this.selectedFile.filedrive;
      window.open(downloadUrl); 
    } else {
      console.error('No file selected to download.');
    }
  }

  resetForm(): void {
    this.uploadForm.reset();
    this.selectedFile = null;
    this.fileUrl = null;
  }
}
export interface FileDetails {
  filename: string;
  filetype: string;
  filedrive: string;
  
}

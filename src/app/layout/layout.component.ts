  import { Component, OnInit } from '@angular/core';
  import { FileUploadService } from '../services/file-upload.service';
  import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
  // import { EncryptionService } from '../services/encryption.service';
  import { CommonModule } from '@angular/common';
  import { environment } from '../environment';
  import { Router } from '@angular/router';

  @Component({
    selector: 'app-layout',
    standalone: true,
    imports: [FormsModule,ReactiveFormsModule,CommonModule],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.css'
  })
  export class LayoutComponent implements OnInit {
    uploadForm: FormGroup;
    fetchEmail: string = '';
    selectedFile: any = null; // Use any type for simplicity, adjust as per actual file structure
    fileUrl: string | null = null;
    files: any[] = []; // Array to store fetched files
  
    constructor(private fb: FormBuilder, private uploadService: FileUploadService,private router: Router) {
      this.uploadForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        file: [null, Validators.required]
      });
    }
  
    ngOnInit(): void {}
  
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
  
    fetchFile(email: string): void {
      // Check if email is not empty and has more than one character
      if (email.trim() !== '' && email.trim().length > 10) {
        this.router.navigate(['/fetch'], { queryParams: { emails: email }});
      }
      // Optionally handle else case if needed
    }
    
    
  
    selectFile(file: FileDetails): void {
      this.selectedFile = file;
      this.fileUrl = 'data:' + file.filetype + ';base64,' + file.filedrive;
      // console.log("Selected File:", this.selectedFile);
    }
  
    downloadSelectedFile(): void {
      if (this.selectedFile) {
        const downloadUrl = 'data:' + this.selectedFile.filetype + ';base64,' + this.selectedFile.filedrive;
        window.open(downloadUrl); // Open download in new tab or use other download methods
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
    filedrive: string; // Assuming filedrive is a base64-encoded string for the file content
    // Add other properties as per your API response structure
  }
  
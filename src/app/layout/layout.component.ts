  import { Component, OnInit } from '@angular/core';
  import { FileUploadService } from '../services/file-upload.service';
  import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
  import { EncryptionService } from '../services/encryption.service';
  import { CommonModule } from '@angular/common';
  import { environment } from '../environment';

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
    selectedFile: File | null = null;
    fileUrl: string | null = null;
  
    constructor(private fb: FormBuilder, private uploadService: FileUploadService) {
      this.uploadForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        file: [null, Validators.required]
      });
    }
  
    ngOnInit(): void {}
  
    // Called when a file is selected
    onFileSelected(event: any): void {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        this.uploadForm.patchValue({ file: file });
      }
    }
  
    // Called when the form is submitted to upload a file
    onSubmit(): void {
      if (this.uploadForm.invalid || !this.selectedFile) {
        console.error('Form is invalid or no file selected');
        return;
      }
  
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          const base64String = reader.result.toString().split(',')[1];
          const payload = {
            email: this.uploadForm.value.email,
            filename: this.selectedFile?.name,
            filetype: this.selectedFile?.type,
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
  
    // Fetch file based on email
    fetchFile(email: string): void {
      this.uploadService.fetchFile(email).subscribe(
        (response: any) => {
          if (response && response.filedrive) {
            this.fileUrl = 'data:' + response.filetype + ';base64,' + response.filedrive;
          } else {
            console.error('No file found for the email:', email);
          }
        },
        error => {
          console.error('Error fetching file:', error);
        }
      );
    }
  
    // Reset the form after file upload
    resetForm(): void {
      this.uploadForm.reset();
      this.selectedFile = null;
      this.fileUrl = null;
    }
  }
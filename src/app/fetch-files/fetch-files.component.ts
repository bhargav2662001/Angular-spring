import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadService } from '../services/file-upload.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fetch-files',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './fetch-files.component.html',
  styleUrl: './fetch-files.component.css'
})
export class FetchFilesComponent {
  fetchEmail: string = '';
  selectedFile: any = null; 
  fileUrl: string | null = null;
  files: any[] = []; 
  email:string=''

  constructor(private uploadService:FileUploadService,private router: ActivatedRoute){
 router.queryParams.subscribe((data:any)=>{
      this.email=data.emails
    })

  }

  ngOnInit(){
    this.uploadService.fetchFile(this.email).subscribe(
      (response: FileDetails[]) => {
        this.files = response; // Store fetched files in component variable
        if (this.files.length > 0) {
          // Pre-select the first file by default
          this.selectFile(this.files[0]);
        } else {
          console.error('No files found for the email:', this.email);
        }
      },   
      error => {
        console.error('Error fetching files:', error);
      }
    );
  }
  
  selectFile(file: FileDetails): void {
    this.selectedFile = file;
    this.fileUrl = 'data:' + file.filetype + ';base64,' + file.filedrive;
    // console.log("Selected File:", this.selectedFile);
  }

  downloadSelectedFile(): void {
    if (this.selectedFile) {
      const downloadUrl = 'data:' + this.selectedFile.filetype + ';base64,' + this.selectedFile.filedrive;
      window.open(downloadUrl); 
    } else {
      console.error('No file selected to download.');
    }
  }
}
export interface FileDetails {
  filename: string;
  filetype: string;
  filedrive: string; 
}
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent implements OnInit {
  filetype: string | null = null;
  fileUrl: string | null = null;
  filename: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.filetype = params['filetype'];
      this.fileUrl = 'data:' + params['filetype'] + ';base64,' + params['filedrive'];
      this.filename = params['filename'];
    });
  }

  closePreview() {
    history.back();
  }
}
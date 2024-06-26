import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchFilesComponent } from './fetch-files.component';

describe('FetchFilesComponent', () => {
  let component: FetchFilesComponent;
  let fixture: ComponentFixture<FetchFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FetchFilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FetchFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

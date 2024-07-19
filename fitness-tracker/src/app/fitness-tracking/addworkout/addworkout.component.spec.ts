import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddworkoutComponent } from './addworkout.component';
import { CommonModule } from '@angular/common';

describe('AddworkoutComponent', () => {
  let component: AddworkoutComponent;
  let fixture: ComponentFixture<AddworkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddworkoutComponent,CommonModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddworkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

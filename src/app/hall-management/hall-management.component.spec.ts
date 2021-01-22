import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallManagementComponent } from './hall-management.component';

describe('HallManagementComponent', () => {
  let component: HallManagementComponent;
  let fixture: ComponentFixture<HallManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HallManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HallManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

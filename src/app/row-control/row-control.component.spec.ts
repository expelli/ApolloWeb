import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowControlComponent } from './row-control.component';

describe('RowControlComponent', () => {
  let component: RowControlComponent;
  let fixture: ComponentFixture<RowControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RowControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RowControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

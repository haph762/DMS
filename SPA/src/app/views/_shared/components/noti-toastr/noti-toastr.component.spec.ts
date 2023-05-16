import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotiToastrComponent } from './noti-toastr.component';

describe('NotiToastrComponent', () => {
  let component: NotiToastrComponent;
  let fixture: ComponentFixture<NotiToastrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotiToastrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotiToastrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

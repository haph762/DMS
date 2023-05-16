import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownListFilterComponent } from './dropdown-list-filter.component';

describe('DropdownListFilterComponent', () => {
  let component: DropdownListFilterComponent;
  let fixture: ComponentFixture<DropdownListFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownListFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

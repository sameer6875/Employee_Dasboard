import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDasbordComponent } from './employee-dasbord.component';

describe('EmployeeDasbordComponent', () => {
  let component: EmployeeDasbordComponent;
  let fixture: ComponentFixture<EmployeeDasbordComponent>;
   
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeDasbordComponent]
    });
    fixture = TestBed.createComponent(EmployeeDasbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EmployeeModel } from './employee-dash bord.model';

@Component({
  selector: 'app-employee-dasbord',
  templateUrl: './employee-dasbord.component.html',
  styleUrls: ['./employee-dasbord.component.css']
})
export class EmployeeDasbordComponent {
  formValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData!: any;
  addemp!:boolean;
  update!: boolean

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: ['']
    });
    this.getAllEmployee();
  }
  switchToAddMode() {
    this.addemp = true;
    this.update = false;
  }

  switchToUpdateMode() {
    this.addemp = false;
    this.update = true;
  }

  postEmployeeDetails() {
    this.switchToAddMode();
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.http.post<any>('http://localhost:3000/posts', this.employeeModelObj)
      .subscribe(
        res => {
          console.log(res);
          alert('Employee details posted successfully');
          let ref = document.getElementById('cancel');
          ref?.click();
          this.getAllEmployee();
          this.formValue.reset();
        },
        error => {
          console.log(error);
          alert('An error occurred while posting employee details');
        }
      );
  }

  getAllEmployee() {
    this.http.get<any>('http://localhost:3000/posts')
      .subscribe(
        res => {
          this.employeeData = res;
        },
        error => {
          console.log(error);
          alert('An error occurred while retrieving employee data');
        }
      );
  }

  deleteEmployee(row: any) {
    this.http.delete<any>('http://localhost:3000/posts/' + row.id)
      .subscribe(
        res => {
          alert('Employee deleted successfully');
          this.getAllEmployee();
        },
        error => {
          console.log(error);
          alert('An error occurred while deleting the employee');
        }
      );
  }

  editEmployee(row: any) {
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployeeDetails() {
    this.switchToUpdateMode();
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.update;
  
    // Make an HTTP PUT request to update the employee details
   this.http.put<any>(" http://localhost:3000/posts/" +this.employeeModelObj.id, this.employeeModelObj)
      .subscribe(
        res => {
          console.log(res);
          alert('Employee details updated successfully');
          let ref = document.getElementById('cancel');
          ref?.click();
          this.getAllEmployee();
          this.formValue.reset();
        },
        error => {
          console.log(error);
          alert('An error occurred while updating employee details');
        }
      );
  }
  
}

import { Component, inject, DestroyRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmployeeService } from '../../services/employee.service';
import Employee from '../../model/employee.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { take } from 'rxjs';

@Component({
  selector: 'app-employee',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    CurrencyPipe,
    DatePipe,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export default class EmployeeComponent {
  private readonly DestroyRef = inject(DestroyRef);
  private readonly employeeService = inject(EmployeeService);
  readonly displayedColumns = [
    'id',
    'name',
    'role',
    'doj',
    'salary',
    'actions',
  ];
  datatable: MatTableDataSource<Employee> = new MatTableDataSource<Employee>();
  employees: Employee[] = [];

  ngOnInit(): void {
    this.getEmployees();
    this.employeeService.isNewEmployeeAdded$.subscribe((isNewEmployeeAdded) => {
      if (isNewEmployeeAdded) {
        this.getEmployees();
        this.employeeService.isNewEmployeeAdded.next(false);
      }
    });
  }

  getEmployees(): void {
    this.employeeService
      .getEmployees()
      .pipe(take(1), takeUntilDestroyed(this.DestroyRef))
      .subscribe((employees) => {
        this.employees = employees;
        this.datatable.data = this.employees;
      });
  }
}

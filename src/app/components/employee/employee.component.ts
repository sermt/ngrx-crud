import { Component, inject, DestroyRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmployeeService } from '../../services/employee.service';
import Employee from '../../model/employee.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { take } from 'rxjs';
import { PopupService } from '../../services/popup.service';
import { Store } from '@ngrx/store';
import { EmployeeActions } from '../../store/employee.actions';
import { selectAllEmployees } from '../../store/employee.selectors';

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
  private readonly store = inject(Store);
  private readonly popupService = inject(PopupService);
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
  }

  getEmployees(): void {
    this.store.dispatch(EmployeeActions.getEmployees());
    this.store.select(selectAllEmployees).subscribe((employees) => {
      this.employees = employees;
      this.datatable.data = this.employees;
    });
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.store.dispatch(EmployeeActions.deleteEmployee({ employeeId: id }));
    }
  }

  editEmployee(id: number): void {
    this.popupService.openPopup(id);
  }
}

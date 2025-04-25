import { Component, DestroyRef, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Role } from '../../model/employee.interface';
import { MatDialogRef } from '@angular/material/dialog';
import { NgFor } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import employeeFromForm from '../../adapters/employeeFromForm.dto';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
@Component({
  selector: 'app-add-employee',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    NgFor,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly employeeService = inject(EmployeeService);
  private readonly formBuilder = inject(FormBuilder);
  readonly roles: Role[] = Object.values(Role);

  readonly createEmployeeForm = this.formBuilder.group({
    name: ['', Validators.required],
    doj: ['', Validators.required],
    role: ['', Validators.required],
    salary: ['', Validators.required],
  });

  saveEmployee(): void {
    const employee = employeeFromForm(
      this.createEmployeeForm.getRawValue() as Record<string, string>
    );

    this.employeeService
      .addEmployee(employee)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => this.createEmployeeForm.reset()),
        tap((employee) => console.log('Employee added successfully', employee)),
        tap(() => this.close())
      )
      .subscribe();
  }

  private dialogRef = inject(MatDialogRef<AddEmployeeComponent>);

  close(): void {
    this.dialogRef.close();
  }
}

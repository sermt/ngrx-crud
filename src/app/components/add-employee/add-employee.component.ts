import { Component, DestroyRef, inject, OnInit } from '@angular/core';
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
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgFor } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import employeeFromForm from '../../adapters/employeeFromForm.dto';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { EmployeeActions } from '../../store/employee.actions';
import { selectEmployeeById } from '../../store/employee.selectors';
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
export class AddEmployeeComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly store = inject(Store);
  private readonly formBuilder = inject(FormBuilder);
  private isEdit = false;
  public readonly data: Record<string, string | undefined> =
    inject(MAT_DIALOG_DATA);
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

    if (this.isEdit) {
      this.store.dispatch(EmployeeActions.updateEmployee({ employee }));
    } else {
      this.store.dispatch(EmployeeActions.addEmployee({ employee }));
    }
  }

  private dialogRef = inject(MatDialogRef<AddEmployeeComponent>);

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if (this.isEdit) {
      this.store.select(selectEmployeeById).subscribe((employee) => {
        this.createEmployeeForm.patchValue({
          name: employee!.name,
          doj: String(employee!.doj),
          role: employee!.role,
          salary: String(employee!.salary),
        });
      });
    }
  }
}

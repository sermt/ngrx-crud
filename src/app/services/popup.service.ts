import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../components/add-employee/add-employee.component';
import { Store } from '@ngrx/store';
import { EmployeeActions } from '../store/employee.actions';

@Injectable({ providedIn: 'root' })
export class PopupService {
  readonly employeeDialog = inject(MatDialog);
  private readonly store = inject(Store);
  openPopup(id: number | undefined = undefined): void {
    const data = { isEdit: !!id };
    if (id) {
      this.store.dispatch(EmployeeActions.getEmployeeById({ id }));
    }

    this.employeeDialog.open(AddEmployeeComponent, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data,
    });
  }
}

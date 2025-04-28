import { inject, Injectable } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeeActions } from './employee.actions';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class EmployeeEffects {
  private readonly employeeService = inject(EmployeeService);
  private readonly actions$ = inject(Actions);
  private readonly toastrService = inject(ToastrService);

  getEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.getEmployees),
      switchMap(() =>
        this.employeeService.getEmployees().pipe(
          map((employees) =>
            EmployeeActions.getEmployeesSuccess({ employees })
          ),
          catchError((error) => of(EmployeeActions.getEmployeesFail({ error })))
        )
      )
    )
  );

  getEmployeeById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.getEmployeeById),
      switchMap((action) =>
        this.employeeService.getEmployeeById(action.id).pipe(
          map((employee) =>
            EmployeeActions.getEmployeeByIdSuccess({ employee })
          ),
          catchError((error) =>
            of(EmployeeActions.getEmployeeByIdFail({ error }))
          )
        )
      )
    )
  );

  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.deleteEmployee),
      mergeMap((action) =>
        this.employeeService.deleteEmployee(action.employeeId).pipe(
          map(() =>
            EmployeeActions.deleteEmployeeSuccess({
              employeeId: action.employeeId,
            })
          ),
          catchError((error) =>
            of(EmployeeActions.deleteEmployeeFail({ error }))
          )
        )
      )
    )
  );

  addEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.addEmployee),
      mergeMap((action) =>
        this.employeeService.addEmployee(action.employee).pipe(
          map((employee) => EmployeeActions.addEmployeeSuccess({ employee })),
          catchError((error) => of(EmployeeActions.addEmployeeFail({ error })))
        )
      )
    )
  );

  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.updateEmployee),
      switchMap((action) =>
        this.employeeService.updateEmployee(action.employee).pipe(
          map((employee) =>
            EmployeeActions.updateEmployeeSuccess({ employee })
          ),
          catchError((error) =>
            of(EmployeeActions.updateEmployeeFail({ error }))
          )
        )
      )
    )
  );
}

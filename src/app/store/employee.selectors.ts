import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeeState } from './employee.reducers';

export const selectEmployeeState =
  createFeatureSelector<EmployeeState>('employees');

export const selectAllEmployees = createSelector(
  selectEmployeeState,
  (state) => state.employees
);

export const selectEmployeesLoading = createSelector(
  selectEmployeeState,
  (state) => state.loading
);

export const selectEmployeesError = createSelector(
  selectEmployeeState,
  (state) => state.error
);

export const selectEmployeeById = createSelector(
  selectEmployeeState,
  (state) => state.employees.find((e) => e.id === state.employeeId) || null
);

import { createReducer, on } from '@ngrx/store';
import { EmployeeActions } from './employee.actions';
import Employee from '../model/employee.interface';

export interface EmployeeState {
  employees: Employee[];
  error: any | null;
  loading: boolean;
  employeeId: number | null;
}

export const initialState: EmployeeState = {
  employees: [],
  error: null,
  loading: false,
  employeeId: null,
};

export const employeeReducer = createReducer(
  initialState,

  on(EmployeeActions.getEmployees, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(EmployeeActions.getEmployeesSuccess, (state, { employees }) => ({
    ...state,
    employees,
    loading: false,
    error: null,
  })),

  on(EmployeeActions.getEmployeesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(EmployeeActions.addEmployee, (state, { employee }) => ({
    ...state,
    employees: [...state.employees, employee],
  })),

  on(EmployeeActions.updateEmployee, (state, { employee }) => ({
    ...state,
    employees: state.employees.map((e) =>
      e.id === employee.id ? { ...e, ...employee } : e
    ),
  })),

  on(EmployeeActions.deleteEmployee, (state, { employeeId }) => ({
    ...state,
    employees: state.employees.filter((e) => e.id !== employeeId),
  })),

  on(EmployeeActions.getEmployeeById, (state, { id }) => ({
    ...state,
    employeeId: id,
  })),

  on(EmployeeActions.getEmployeeByIdSuccess, (state, { employee }) => ({
    ...state,
    employeeId: employee.id,
  })),

  on(EmployeeActions.getEmployeeByIdFail, (state, { error }) => ({
    ...state,
    employeeId: null,
  })),

  on(EmployeeActions.updateEmployeeSuccess, (state, { employee }) => ({
    ...state,
    employees: state.employees.map((e) =>
      e.id === employee.id ? { ...e, ...employee } : e
    ),
  })),

  on(EmployeeActions.updateEmployeeFail, (state, { error }) => ({
    ...state,
    error,
  })),

  on(EmployeeActions.deleteEmployeeSuccess, (state, { employeeId }) => ({
    ...state,
    employees: state.employees.filter((e) => e.id !== employeeId),
  }))
);

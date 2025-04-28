import { createAction, props } from '@ngrx/store';
import Employee from '../model/employee.interface';

const enum EmployeeActionTypes {
  ADD_EMPLOYEE = '[Employee] Add Employee',
  ADD_EMPLOYEE_SUCCESS = '[Employee] Add Employee Success',
  ADD_EMPLOYEE_FAIL = '[Employee] Add Employee Fail',
  UPDATE_EMPLOYEE = '[Employee] Update Employee',
  UPDATE_EMPLOYEE_SUCCESS = '[Employee] Update Employee Success',
  UPDATE_EMPLOYEE_FAIL = '[Employee] Update Employee Fail',
  DELETE_EMPLOYEE = '[Employee] Delete Employee',
  DELETE_EMPLOYEE_SUCCESS = '[Employee] Delete Employee Success',
  DELETE_EMPLOYEE_FAIL = '[Employee] Delete Employee Fail',
  GET_EMPLOYEES = '[Employee] Get Employees',
  GET_EMPLOYEES_SUCCESS = '[Employee] Get Employees Success',
  GET_EMPLOYEES_FAIL = '[Employee] Get Employees Fail',
  GET_EMPLOYEE = '[Employee] Get Employee',
  GET_EMPLOYEE_SUCCESS = '[Employee] Get Employee Success',
  GET_EMPLOYEE_FAIL = '[Employee] Get Employee Fail',
}

const getEmployees = createAction(EmployeeActionTypes.GET_EMPLOYEES);

const getEmployeesSuccess = createAction(
  EmployeeActionTypes.GET_EMPLOYEES_SUCCESS,
  props<{ employees: Employee[] }>()
);

const getEmployeesFail = createAction(
  EmployeeActionTypes.GET_EMPLOYEES_FAIL,
  props<{ error: any }>()
);

const getEmployeeById = createAction(
  EmployeeActionTypes.GET_EMPLOYEE,
  props<{ id: number }>()
);

const getEmployeeByIdSuccess = createAction(
  EmployeeActionTypes.GET_EMPLOYEE_SUCCESS,
  props<{ employee: Employee }>()
);

const getEmployeeByIdFail = createAction(
  EmployeeActionTypes.GET_EMPLOYEE_FAIL,
  props<{ error: any }>()
);

const addEmployee = createAction(
  EmployeeActionTypes.ADD_EMPLOYEE,
  props<{ employee: Employee }>()
);

const addEmployeeSuccess = createAction(
  EmployeeActionTypes.ADD_EMPLOYEE_SUCCESS,
  props<{ employee: Employee }>()
);

const addEmployeeFail = createAction(
  EmployeeActionTypes.ADD_EMPLOYEE_FAIL,
  props<{ error: any }>()
);

const updateEmployee = createAction(
  EmployeeActionTypes.UPDATE_EMPLOYEE,
  props<{ employee: Employee }>()
);

const updateEmployeeSuccess = createAction(
  EmployeeActionTypes.UPDATE_EMPLOYEE_SUCCESS,
  props<{ employee: Employee }>()
);

const updateEmployeeFail = createAction(
  EmployeeActionTypes.UPDATE_EMPLOYEE_FAIL,
  props<{ error: any }>()
);

const deleteEmployee = createAction(
  EmployeeActionTypes.DELETE_EMPLOYEE,
  props<{ employeeId: number }>()
);

const deleteEmployeeSuccess = createAction(
  EmployeeActionTypes.DELETE_EMPLOYEE_SUCCESS,
  props<{ employeeId: number }>()
);

const deleteEmployeeFail = createAction(
  EmployeeActionTypes.DELETE_EMPLOYEE_FAIL,
  props<{ error: any }>()
);

export const EmployeeActions = {
  getEmployees,
  getEmployeesSuccess,
  getEmployeesFail,
  getEmployeeById,
  getEmployeeByIdSuccess,
  getEmployeeByIdFail,
  addEmployee,
  addEmployeeSuccess,
  addEmployeeFail,
  updateEmployee,
  updateEmployeeSuccess,
  updateEmployeeFail,
  deleteEmployee,
  deleteEmployeeSuccess,
  deleteEmployeeFail,
};

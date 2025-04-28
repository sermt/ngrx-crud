import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import Employee from '../model/employee.interface';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly apiUrl = 'http://localhost:3000/employees';
  private readonly toastr = inject(ToastrService);
  private readonly http = inject(HttpClient);
  readonly isNewEmployeeAdded = new BehaviorSubject<boolean>(false);
  readonly isNewEmployeeAdded$ = this.isNewEmployeeAdded.asObservable();

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee).pipe(
      tap((createdEmployee) => {
        this.isNewEmployeeAdded.next(true);
        this.toastr.success(
          `Employee ${createdEmployee.name} added successfully`
        );
      }),
      catchError((error) => {
        this.toastr.error('Failed to add employee');
        return throwError(() => new Error('Failed to add employee'));
      })
    );
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee);
  }

  deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        this.toastr.error('Failed to delete employee');
        return throwError(() => new Error('Failed to delete employee'));
      }),
      // tap(() => this.isNewEmployeeAdded.next(true)),
      tap(() => this.toastr.success('Employee deleted successfully'))
    );
  }
}

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'employee',
    loadComponent: () => import('./components/employee/employee.component'),
  },
];

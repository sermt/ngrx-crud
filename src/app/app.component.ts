import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatDialogModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly addEmployeeDialog = inject(MatDialog);

  addEmployee(): void {
    this.addEmployeeDialog.open(AddEmployeeComponent, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
    });
  }
}

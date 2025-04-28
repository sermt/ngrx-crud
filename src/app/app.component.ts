import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PopupService } from './services/popup.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatDialogModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly popupService = inject(PopupService);

  addEmployee(): void {
    this.popupService.openPopup();
  }
}

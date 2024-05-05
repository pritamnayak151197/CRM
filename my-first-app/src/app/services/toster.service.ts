import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private snackBar: MatSnackBar) { }

  showSuccess(message: string): void {
    this.showToaster(message, 'Success', 'success-snackbar');
  }

  showError(message: string): void {
    this.showToaster(message, 'Error', 'error-snackbar');
  }

  private showToaster(message: string, action: string, panelClass: string): void {
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'top';
    config.horizontalPosition = 'end';
    config.duration = 3000; // 3 seconds
    config.panelClass = [panelClass];

    this.snackBar.open(message, null, config);
  }
}

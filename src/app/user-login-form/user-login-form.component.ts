import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationServices } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserRegistrationServices,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public router: Router,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      this.dialogRef.close();
      this.snackBar.open('Login successful', 'OK', {
        duration: 2000
      });

      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', result.token);
      this.router.navigate(['movies']);
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}

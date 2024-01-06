import { Component, makeEnvironmentProviders } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  constructor(
    public router: Router
  ) { }

  profileView(): void {
    this.router.navigate(['profile']);
  }

  mainPage(): void {
    this.router.navigate(['movies']);
  }

  logoutUser(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }
}

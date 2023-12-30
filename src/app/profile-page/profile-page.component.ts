import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationServices } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProfileUpdateComponent } from '../profile-update/profile-update.component';

type User = {
  _id?: string, Username?: string, Password?: string,
  Email?: string,
  Birthday?: Date | null, FavoriteMovies?: any[]
};

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})

export class ProfilePageComponent {
  user: User = {};
  favoriteMovies: any[] = [];

  @Input() userData = {
    Username: '', Password: '', Email: '',
    Birthday: null as Date | null,
  };

  constructor(
    public fetchApiData: UserRegistrationServices,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const user = this.getUser();

    if (!user._id) {
      this.router.navigate(['welcome']);
      return;
    }

    this.user = user;
    this.getFavoriteMovies();


    this.userData = {
      Username: user.Username || '',
      Password: '',
      Email: user.Email || '',
      Birthday: user.Birthday || null,
    }
  }

  openProfileUpdateDialog(): void {
    this.dialog.open(ProfileUpdateComponent, {
      width: '280px'
    });
  }

  public back(): void {
    this.router.navigate(['movies']);
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  getFavoriteMovies(): void {
    if (this.user && Array.isArray(this.user.FavoriteMovies)) {
      this.fetchApiData.getAllMovies().subscribe((movies) => {
        console.log('All Movies:', movies);
        this.favoriteMovies = movies.filter((movie: any) =>
          this.user.FavoriteMovies!.includes(movie._id)
        );

        console.log('Favorite Movies:', this.favoriteMovies);
      });
    } else {
      console.error('User or user\'s favorite movies are undefined or not an array.');
    }
  }
}
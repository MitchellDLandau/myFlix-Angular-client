import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationServices } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProfileUpdateComponent } from '../profile-update/profile-update.component';
import { MoreInfoComponent } from '../more-info/more-info.component';
import { DatePipe } from '@angular/common';

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
    public dialog: MatDialog,
    private datePipe: DatePipe
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

  openGenre(Genre: any): void {
    this.dialog.open(MoreInfoComponent, {
      data: {
        Title: Genre.Name,
        content: Genre.Description,
      }
    })
  }

  openDirector(Director: any): void {
    this.dialog.open(MoreInfoComponent, {
      data: {
        Title: Director.Name,
        content: Director.Bio,
      }
    })
  }

  openDescription(movie: any): void {
    this.dialog.open(MoreInfoComponent, {
      data: {
        Title: movie.Title,
        content: movie.Description,
      }
    })
  }

  getFavoriteMovies(): void {
    if (this.user && Array.isArray(this.user.FavoriteMovies)) {
      this.fetchApiData.getAllMovies().subscribe((movies) => {
        this.favoriteMovies = movies.filter((movie: any) =>
          this.user.FavoriteMovies!.includes(movie._id)
        );
      });
    } else {
      console.error('User or user\'s favorite movies are undefined or not an array.');
    }
  }

  isFavorite(movieID: string): boolean {
    const userString = localStorage.getItem('user');
    if (!userString) {
      console.error('User not found in local storage.');
      return false;
    }
    const user = JSON.parse(userString);
    return user.FavoriteMovies.includes(movieID);
  }

  toggleFavorite(movieID: string): void {
    const userString = localStorage.getItem('user');
    if (!userString) {
      console.error('User not found in local storage.');
      return;
    }
    const user = JSON.parse(userString);
    const userName = user.Username;

    if (this.isFavorite(movieID)) {
      // Remove from favorites
      this.fetchApiData.deleteFavorite(userName, movieID).subscribe((resp: any) => {
        this.snackBar.open('Removed from favorites!', 'OK', {
          duration: 2000
        });
      });
    } else {
      // Add to favorites
      this.fetchApiData.addFavoriteMovie(userName, movieID).subscribe((resp: any) => {
        this.snackBar.open('Added to favorites!', 'OK', {
          duration: 2000
        });
      });
    }
  }
}
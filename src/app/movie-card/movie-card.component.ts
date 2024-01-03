import { Component, Inject } from '@angular/core';
import { UserRegistrationServices } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MoreInfoComponent } from '../more-info/more-info.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})

export class MovieCardComponent {
  movies: any[] = [];
  constructor(
    public fetchApiData: UserRegistrationServices,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
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
        console.log('Movie removed from favorites:', resp);
        this.snackBar.open('Removed from favorites!', 'OK', {
          duration: 2000
        });
      });
    } else {
      // Add to favorites
      this.fetchApiData.addFavoriteMovie(userName, movieID).subscribe((resp: any) => {
        console.log('Movie added to favorites:', resp);
        this.snackBar.open('Added to favorites!', 'OK', {
          duration: 2000
        });
      });
    }
  }
}

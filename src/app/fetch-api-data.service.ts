import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://marvel-movie-mapper-0064171d8b92.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

export class UserRegistrationServices {

  constructor(private http: HttpClient) { }

  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }
  //returns all movies 
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  //returns one movie
  getOneMovie(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + id, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  //returns JSON of the director and their descripton
  getOneDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + 'director/:' + directorName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  //returns JSON of the genre and its description
  getOneGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + 'genre/:' + genreName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  //Returns JSON of all movies hero apears in 
  getHeroesMovies(heroName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + 'heroes/:' + heroName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  //returns a user from their id
  getUser(userID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/:' + userID, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  //extract favorite movies from user
  favoriteMovies(userID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/:' + userID, {
      headers: new HttpHeaders(
        {
          Authroization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      map((data) => data.favoriteMovies),
      catchError(this.handleError)
    );
  }
  //add a movie to the users favorites
  addFavoriteMovie(movieID: string, userName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/:' + userName + '/movies/:' + movieID, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  //add a movie to the database
  addAMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //edit the users info
  editUser(updatedUser: any): Observable<any> { //do I need the userData to be passed
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userID = user._id;
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + userID, updatedUser, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  //delete favorite movie from users favorites
  deleteFavorite(userName: string, movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/:' + userName + '/movies/:' + movieID, {
      headers: new HttpHeaders(
        {
          Authroization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  //delete a user
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userID = user._id;
    return this.http.delete(apiUrl + 'users/' + userID, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }),
      responseType: 'text',
    })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  //non-typed response extraction
  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'something bad happened; please try again later.');
  }
}



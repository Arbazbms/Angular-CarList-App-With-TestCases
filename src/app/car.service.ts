import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpErrorResponse} from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs';
import { Car } from './models/car';
@Injectable({
  providedIn: 'root'
})
export class CarService {
  url:string = "http://localhost:8080/CarService/jaxrs/cars"
  constructor(private http:HttpClient) { }

  
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it.
       console.error('An error occurred:', error.error.message);
     } else {
    // The backend returned an unsuccessful response code.
     // The response body may contain clues
     
     console.error( `Backend returned code ${error.status}, ` + `body was: ${error.error}`);
   
    } // return an observable with a user-facing error message
    return throwError(() => 'Unable to contact service; please try again later.'); 
   
   };
  getCars():Observable<Car[]> {
    return this.http.get<Car[]>(this.url).pipe(catchError(this.handleError));
  }

  getCarsByPrice():Observable<Car[]> {
    return this.http.get<Car[]>(this.url+'/?filter=price').pipe(catchError(this.handleError));
  }

}

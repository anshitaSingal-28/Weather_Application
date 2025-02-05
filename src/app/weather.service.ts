import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../environments/environment'; 

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = environment.apiUrl;  
  
  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {  
    if (!city.trim()) {
      return throwError(() => new Error('City name cannot be empty'));
    }

    return this.http.get(`${this.apiUrl}/weather?city=${encodeURIComponent(city)}`).pipe(
      catchError((error) => {
        console.error('Error fetching weather data:', error);
        let errorMessage = 'Failed to fetch weather data';
        if (error.status === 404) {
          errorMessage = 'City not found. Please check the city name.';
        } else if (error.status === 400) {
          errorMessage = 'Invalid city name.';
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}

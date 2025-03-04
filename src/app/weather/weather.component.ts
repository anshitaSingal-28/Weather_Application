import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent {
  @Output() backgroundChange = new EventEmitter<string>();
  city: string = 'Hisar';
  weatherData: any = null;
  errorMessage: string = '';
  loading: boolean = false;
  searchedCities: any[] = [];
  backgroundImage: string = 'assets/default.jpg';

  private API_KEY = '9cf80b5e5b3ee838cf37b850b9957cb2';

  constructor(private http: HttpClient) {}

  getWeather(): void {
    this.loading = true;
    this.errorMessage = '';

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.API_KEY}&units=metric`;

    this.http.get(apiUrl)
      .pipe(
        catchError(error => {
          this.weatherData = null;
          this.errorMessage = 'Failed to fetch weather data.';
          this.loading = false;
          return throwError(() => new Error('Failed to fetch weather data'));
        })
      )
      .subscribe((data: any) => {
        this.weatherData = {
          city: data.name,
          temperature: data.main.temp,
          description: data.weather[0].description
        };
        this.searchedCities.push(this.weatherData);
        this.loading = false;
        this.updateBackground(this.weatherData.description);
      });
  }

  changeBackground(imageUrl: string): void {
    this.backgroundImage = imageUrl;
  }

  updateBackground(description: string): void {
    let backgroundUrl = 'assets/default.jpg';

    if (description.includes('rain')) {
      backgroundUrl = 'assets/rain.jpg';
    } else if (description.includes('clear')) {
      backgroundUrl = 'assets/sunny.jpg';
    } else if (description.includes('cloud')) {
      backgroundUrl = 'assets/cloudy.jpg';
    } else if (description.includes('snow')) {
      backgroundUrl = 'assets/snow.jpg';
    } else if (description.includes('haze')) {
      backgroundUrl = 'assets/haze.jpg';
    } else if (description.includes('smoke')) {
      backgroundUrl = 'assets/smoke.jpeg';
    }

    this.backgroundChange.emit(backgroundUrl);
  }

  deleteCity(index: number): void {
    this.searchedCities.splice(index, 1);
  }

  exportAsCSV(): void {
    if (this.searchedCities.length === 0) {
      alert("No data available to export.");
      return;
    }
    
    const csvHeader = "City, Temperature (°C), Description\n";
    
    const csvRows = this.searchedCities.map(city => 
      `"${city.city}", "${city.temperature}", "${city.description}"`
    ).join("\n");
    
    const csvContent = csvHeader + csvRows;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'weather_data.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
  }
}

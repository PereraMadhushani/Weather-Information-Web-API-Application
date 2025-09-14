import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiUrl = 'http://localhost:5000/api'; // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  getWeatherData(cityId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/weather/${cityId}`);
  }

   getAllCitiesWeather(): Observable<any> {
    // This calls the public endpoint /api/cities
    return this.http.get<any>(`${this.apiUrl}/cities`);
  }
}

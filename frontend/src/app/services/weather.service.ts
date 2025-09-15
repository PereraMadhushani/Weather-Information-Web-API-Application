import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
private cache = new Map<number, { data: any, expiry: number }>();

  private apiUrl = 'http://localhost:5000/api'; // Replace with your backend API URL

  constructor(private http: HttpClient) { }

   getWeatherData(cityCode: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const now = Date.now();
    const cached = this.cache.get(cityCode);

    //If cached and still valid (5 minutes = 300000 ms), return cached
    if (cached && now < cached.expiry) {
      return of(cached.data);
    }

    //Otherwise fetch from API and cache it
    return this.http.get(`${this.apiUrl}/weather/${cityCode}`, { headers }).pipe(
      tap(data => {
        this.cache.set(cityCode, { data, expiry: now + 300000 }); // 5 min cache
      })
    );
  }

   getAllCitiesWeather(): Observable<any> {
    // This calls the public endpoint /api/cities
    return this.http.get<any>(`${this.apiUrl}/cities`);
  }
}

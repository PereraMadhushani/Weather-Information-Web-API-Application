import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';
import { WeatherListComponent } from './components/weather-list-component/weather-list-component';
import { WeatherDetailComponent } from './components/weather-detail-component/weather-detail-component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,        // Needed for <router-outlet> and routing
    WeatherListComponent,
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  protected title = 'Weather Application';
  isAuthenticated$: any;
  user$: any;
  cities:number[] = [];
  selectedCityId:string = '';
  weatherData:any;
  loading:boolean = false;
  backendUrl = environment.backendUrl;

  constructor(public auth: AuthService, private http: HttpClient) {
    this.isAuthenticated$ = this.auth.isAuthenticated$;
    this.user$ = this.auth.user$;
  }

  ngOnInit(): void {
    this.fetchCities();
  }

  fetchCities(): void {
    this.http.get<number[]>(`${this.backendUrl}/api/cities`).subscribe(
      (data) => { this.cities = data; },
      (error) => { console.error('Error fetching cities:', error); }
    );
  }

  login() {
    this.auth.loginWithRedirect();
  }

  logOut() {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }

  async loadWeatherData() {
    if (!this.selectedCityId) return;
    this.loading = true;

    try {
      const token = await this.auth.getAccessTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };
      const response: any = await this.http.get(`${this.backendUrl}/weather/${this.selectedCityId}`, { headers }).toPromise();
      this.weatherData = response;
    } catch (error) {
      console.error('Error loading weather data:', error);
    } finally {
      this.loading = false;
    }
  }
}

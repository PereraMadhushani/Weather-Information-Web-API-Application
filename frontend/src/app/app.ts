import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';  
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherCardComponent } from '../components/weather-card.component/weather-card.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule,FormsModule,WeatherCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected title = 'Weather Application';
  isAuthenticated$: any;
  user$: any;
  cities:number[]=[];
  selectedCityId:string='';
  weatherData:any;
  loading:boolean=false;
  backendUrl=environment.backendUrl;

  constructor(public auth: AuthService, private http: HttpClient) {
    this.isAuthenticated$ = this.auth.isAuthenticated$;
    this.user$ = this.auth.user$;
  }

  ngOnInit(): void {
    this.fetchCities();
  }

  fetchCities(): void {
    this.http.get<number[]>(`${this.backendUrl}/cities`).subscribe(
      (data) => {
        this.cities = data;
      },
      (error) => {
        console.error('Error fetching cities:', error);
      }
    );
  }

  login() {
    this.auth.loginWithRedirect();
  }

  logOut() {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }

  async loadWeatherData() {
    if (!this.selectedCityId)  return;
    this.loading = true;

    try{
      const token= await this.auth.getAccessTokenSilently();
      const headers={Authorization:`Bearer ${token}`};
      const response: any = await this.http.get(`${this.backendUrl}/weather/${this.selectedCityId}`,{headers}).toPromise();
      this.weatherData = response;
    } catch (error) {
      console.error('Error loading weather data:', error);
    } finally {
      this.loading = false;
    }
  }
}


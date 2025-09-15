import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import List from '../../../data/cities.json';
import { WeatherCardComponent } from '../weather-card-component/weather-card-component';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-weather-list-component',
  standalone: true,
  imports: [CommonModule, WeatherCardComponent],
  templateUrl: './weather-list-component.html',
  styleUrl: './weather-list-component.scss',
})
export class WeatherListComponent implements OnInit {
  cityList: any[] = [];
  weathers: any[] = [];
  weatherList: any;
  isAuthenticated$: any;

  constructor(
    private weatherService: WeatherService,
    private auth: AuthService
  ) {
        this.isAuthenticated$ = this.auth.isAuthenticated$;

  }
  ngOnInit(): void {
    this.cityList = List.List;
    this.weatherService.getAllCitiesWeather().subscribe((data) => {
      this.weathers = data.cities;
    });

    this.auth.getAccessTokenSilently().subscribe((token) => {
      localStorage.setItem('token', token);
    });
  }
  
  login() {
    this.auth.loginWithRedirect();
  }

  logOut() {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }

}

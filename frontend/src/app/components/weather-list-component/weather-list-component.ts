import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import List  from '../../../data/cities.json';
import { WeatherCardComponent } from '../weather-card-component/weather-card-component';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-weather-list-component',
  standalone: true,
  imports: [CommonModule,WeatherCardComponent],
  templateUrl: './weather-list-component.html',
  styleUrl: './weather-list-component.scss'
})
export class WeatherListComponent implements OnInit {
  cityList:any[]=[];
  weathers:any[]=[];  
weatherList: any;

  constructor(private weatherService: WeatherService, private auth: AuthService) { }
  ngOnInit(): void {
    this.cityList = List.List;
    this.weatherService.getAllCitiesWeather().subscribe(data => {
      debugger
      
      console.log("city weather data",data);
      this.weathers = data.cities;
    });

  this.auth.getAccessTokenSilently().subscribe(token => {
      console.log('My token:', token); // token from Auth0
      localStorage.setItem('token', token);
  });
}

}

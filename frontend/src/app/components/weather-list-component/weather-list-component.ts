import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import List  from '../../../data/cities.json';
import { WeatherCardComponent } from '../weather-card-component/weather-card-component';
import { CommonModule } from '@angular/common';

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

  constructor(private weatherService: WeatherService) { }
  ngOnInit(): void {
    this.cityList = List.List;
    this.cityList.forEach(city => {
      this.weatherService.getWeatherData(city.id).subscribe(data => {
        this.weathers.push(data);
      });
    });
  }
  

}

import { Component,OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-detail-component',
  imports: [CommonModule],
  templateUrl: './weather-detail-component.html',
  styleUrl: './weather-detail-component.scss'
})
export class WeatherDetailComponent  implements OnInit {
  weather: any; // Define the type based on your weather data structure

  constructor(private route: ActivatedRoute, private weatherService: WeatherService) { }
  ngOnInit(): void {
    const cityId = Number(this.route.snapshot.paramMap.get('id'));
    this.weatherService.getWeatherData(cityId).subscribe(data => {
      this.weather = data;
    });
    // Fetch weather details based on the city ID from the route
  }

}

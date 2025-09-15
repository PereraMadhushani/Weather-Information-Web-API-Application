import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-detail-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-detail-component.html',
  styleUrls: ['./weather-detail-component.scss']  // ✅ fixed plural
})
export class WeatherDetailComponent implements OnInit {
  weather: any;
  cityCode: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.cityCode = this.route.snapshot.paramMap.get('cityCode');
    console.log("City Code from route:", this.cityCode);

    if (this.cityCode) {
      this.getWeatherDetails(Number(this.cityCode));
    }
  }

  getWeatherDetails(cityCode: number) {
    this.weatherService.getWeatherData(cityCode).subscribe({
      next: (data) => {
        console.log("Weather data:", data);
        this.weather = data;
      },
      error: (err) => {
        console.error("Error fetching weather data:", err);
      }
    });
  }
}

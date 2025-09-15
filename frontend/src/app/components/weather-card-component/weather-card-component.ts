import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-weather-card-component',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './weather-card-component.html',
  styleUrl: './weather-card-component.scss',
})
export class WeatherCardComponent {
  @Input() weatherList!: {
    id: number;
    name: string;
    temp: number;
    description: string;
    status: string;
  };
  @Input() weather: any;

  constructor(private router: Router, private authService: AuthService) {}

  getColor(): string {
    if (!this.weatherList || !this.weatherList.status) return 'bg-gray-200';

    switch (this.weatherList.status.toLowerCase()) {
      case 'sunny':
        return 'bg-yellow-200 text-yellow-900';
      case 'cloudy':
        return 'bg-gray-300 text-gray-800';
      case 'rainy':
        return 'bg-blue-200 text-blue-900';
      case 'storm':
        return 'bg-purple-300 text-purple-900';
      default:
        return 'bg-green-200 text-green-900';
    }
  }

  getTimeAndDate(timestamp: number, timezone: number): string {
    const date = new Date((timestamp + timezone) * 1000);

    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const month = date.toLocaleString('en-US', {
      month: 'long',
      timeZone: 'UTC',
    });
    const day = date.getUTCDate();

    return `${hours}:${minutes} ${ampm}, ${month} ${day}`;
  }
  
    goToWeatherDetail(cityCode: number) {
      console.log('Navigating to cityCode:', cityCode);  
      // Navigate to WeatherDetailComponent and pass data or params
      this.router.navigate(['/weather-detail', cityCode]);
    }


}

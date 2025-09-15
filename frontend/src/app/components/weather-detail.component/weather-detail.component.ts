import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather-detail.component',
  standalone: true,
  imports: [],
  templateUrl: './weather-detail.component.html',
  styleUrl: './weather-detail.component.scss'
})
export class WeatherDetailComponent implements OnInit {
  cityCode!: number;
    @Input() weather: any;


  constructor(private route: ActivatedRoute, private weatherService: WeatherService,private router:Router) {
   
  }
  ngOnInit(): void {
 this.route.params.subscribe(params => {
  console.log("WeatherDetailComponent initialized", params);
  debugger                                    
      this.cityCode = Number(params['cityCode']); // must match the route param
      this.fetchWeatherDetails(this.cityCode);
    }); 
   }

    fetchWeatherDetails(cityCode: number) {
    console.log('Fetch weather for city:', cityCode);
    this.weatherService.getWeatherData(cityCode).subscribe(data => {
      this.weather = data;
      console.log('Weather details:', this.weather);
    }
    );
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

  goBack() {
    this.router.navigate(['/']); // navigate back to weather list
  }

}

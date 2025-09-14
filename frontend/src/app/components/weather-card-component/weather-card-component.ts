import { CommonModule } from '@angular/common';
import { Component ,Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather-card-component',
  imports: [CommonModule],
  templateUrl: './weather-card-component.html',
  styleUrl: './weather-card-component.scss'
})
export class WeatherCardComponent {
  @Input() weatherList !: { id: number, name: string, temp: number, description: string, status: string };
@Input() weather:any;

constructor(private router:Router) { }

viewDetails(id:number){
  this.router.navigate(['/city',id]);
}
  getColor(): string {
    if (!this.weatherList || !this.weatherList.status) return 'bg-gray-200';

    switch (this.weatherList.status.toLowerCase()) {
      case 'sunny': return 'bg-yellow-200 text-yellow-900';
      case 'cloudy': return 'bg-gray-300 text-gray-800';
      case 'rainy': return 'bg-blue-200 text-blue-900';
      case 'storm': return 'bg-purple-300 text-purple-900';
      default: return 'bg-green-200 text-green-900'; // fallback
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  imports: [CommonModule],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss',
  standalone: true,
})
export class WeatherCardComponent {
    @Input() weather!: { id: number; city: string; Temp: number; status?: string };

  
}

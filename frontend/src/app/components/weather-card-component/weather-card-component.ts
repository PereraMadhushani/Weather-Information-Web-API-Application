import { CommonModule } from '@angular/common';
import { Component ,Input} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-weather-card-component',
  imports: [CommonModule],
  standalone: true, 
  templateUrl: './weather-card-component.html',
  styleUrl: './weather-card-component.scss'
})
export class WeatherCardComponent {
  @Input() weatherList !: { id: number, name: string, temp: number, description: string, status: string };
@Input() weather:any;

constructor(private router:Router, private authService: AuthService) { }

// viewDetails(id:number){
//   this.router.navigate(['/city',id]);
// }
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

getTimeAndDate(timestamp: number, timezone: number): string {
  // Convert timestamp + timezone to milliseconds
  const date = new Date((timestamp + timezone) * 1000);

  // Get hours and minutes in 12-hour format
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Get month name and day
  const month = date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
  const day = date.getUTCDate();

  return `${hours}:${minutes} ${ampm}, ${month} ${day}`;
}
 goToDetailsPage(cityName: string) {
    // Check if the user is authenticated
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        // User is logged in, proceed to the details page
        this.router.navigate(['/weather', cityName]);
      } else {
        // User is not logged in, handle the redirection or alert
        // Option A: Open an alert
        alert('Please log in to view detailed weather information.');
        
        // Option B: Redirect to the login page (or trigger the login flow)
        // this.authService.login(); // Assuming your service has a login method
        // or
        // this.router.navigate(['/login']); // Assuming you have a /login route
      }
    });
  }

}

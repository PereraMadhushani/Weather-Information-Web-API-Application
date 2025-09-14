import { Routes } from '@angular/router';
import { WeatherListComponent } from './components/weather-list-component/weather-list-component';
import { WeatherDetailComponent } from './components/weather-detail-component/weather-detail-component';

export const routes: Routes = [
    {path:'', component:WeatherListComponent},
    {path:'city/:id', component:WeatherDetailComponent}
];

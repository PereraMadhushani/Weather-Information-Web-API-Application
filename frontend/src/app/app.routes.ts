import { Routes } from '@angular/router';
import { WeatherListComponent } from './components/weather-list-component/weather-list-component';
import { WeatherDetailComponent } from './components/weather-detail.component/weather-detail.component';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {path:'', component:WeatherListComponent},
     { path: 'weather-detail/:cityCode', component: WeatherDetailComponent, canActivate: [authGuard] },
];

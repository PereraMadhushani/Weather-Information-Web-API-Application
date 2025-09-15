import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs/internal/operators/map';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isAuthenticated$.pipe(
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        alert('You must log in to view weather details!'); 
        router.navigate(['/']);
        return false;
      }
  return true;
})
  );
};

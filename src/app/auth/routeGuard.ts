import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map, take } from 'rxjs/operators';
import { environment } from '../../environment';

export const isAuthenticated = () => {
  if (environment.demoMode) {
    return true;
  }

  const oidcSecurityService = inject(OidcSecurityService);
  const router = inject(Router);

  return oidcSecurityService.isAuthenticated$.pipe(
    take(1),
    map(({ isAuthenticated }) => {
      if (!isAuthenticated) {
        router.navigate(['/login']);

        return false;
      }
      return true;
    })
  );
};


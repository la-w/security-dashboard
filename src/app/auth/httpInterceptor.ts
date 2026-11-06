import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { OidcSecurityService, OpenIdConfiguration } from 'angular-auth-oidc-client';
import { switchMap, take } from 'rxjs/operators';
import { authConfig } from './auth.config';
import { environment } from '../../environment';

export const idTokenAuthInterceptor: HttpInterceptorFn = (request, next) => {
    if (environment.demoMode) {
        return next(request);
    }

    const oidcSecurityService = inject(OidcSecurityService);

    const secureRoutes = (authConfig.config as OpenIdConfiguration).secureRoutes;

    if (secureRoutes == undefined || !secureRoutes.some(route => request.url.startsWith(route))) {
        return next(request);
    }

    return oidcSecurityService.getIdToken().pipe(
        take(1),
        switchMap(token => {
            const modifiedRequest = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });

            return next(modifiedRequest);
        })
    );
}

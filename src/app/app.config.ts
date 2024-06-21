import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { authConfig } from "./auth/auth.config";
import { provideAuth } from "angular-auth-oidc-client";
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from "@angular/common/http";
import { idTokenAuthInterceptor } from "./auth/httpInterceptor";

export const allowedGroups = ["agilesec/tbdpwl"];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideAuth(authConfig),
    provideHttpClient(withFetch(), withInterceptors([idTokenAuthInterceptor])),
  ],
};

import { ApplicationConfig, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {provideHttpClient, withFetch} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { authInitializer } from './auth-initializer';
import { AuthService } from './services/auth.service';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    AuthService,
    {
      provide: 'APP_INITIALIZER',
      useFactory: authInitializer,
      deps: [AuthService],
      multi: true,
    } as Provider
  ]
};
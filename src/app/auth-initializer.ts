// auth-initializer.ts

import { AuthService } from "./services/auth.service";


export function authInitializer(authService: AuthService) {
  return () => {
    authService.checkAuthentication();
  };
}

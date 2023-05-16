import { AuthService } from "../_services/auth.service";

export function refreshTokenInitializer(authService: AuthService) {
  return () => new Promise((resolve:any) => {
    authService.refreshToken().subscribe().add(resolve)
  });
}
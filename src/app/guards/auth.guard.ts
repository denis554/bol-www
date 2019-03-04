import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../modules/bol-core/services/auth.service';
import { RouterHelperService } from '../services/router-helper.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService,
                private routerHelperService: RouterHelperService) {

    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isLoggedIn().then((isLoggedIn) => {
            if (isLoggedIn) return true;
            this.routerHelperService.goToAuth();
            return false;
        }) as any;
    }
}

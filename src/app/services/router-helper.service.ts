import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class RouterHelperService {

    constructor(private router: Router) {

    }

    goToGames(): Promise<boolean> {
        return this.router.navigateByUrl('/games');
    }

    goToGame(): Promise<boolean> {
        return this.router.navigateByUrl('/game');
    }

    goToAuth(): Promise<boolean> {
        return this.router.navigateByUrl('/auth');
    }
}

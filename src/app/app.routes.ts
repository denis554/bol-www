import { AuthGuard } from './guards/auth.guard';
import { HasGameGuard } from './guards/has-game.guard';

export const ROUTES = [
    {
        path: 'auth', loadChildren: './routes/auth-route/auth-route.module#AuthRouteModule'
    },
    {
        path: 'games', loadChildren: './routes/games-route/games-route.module#GamesRouteModule',
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: 'game', loadChildren: './routes/game-route/game-route.module#GameRouteModule',
        canActivate: [
            AuthGuard,
            HasGameGuard
        ]
    },
    {
        path: '', redirectTo: '/games',
        pathMatch: 'full'
    },
    {
        path: '*',
        pathMatch: 'full',
        redirectTo: '/games'
    },
    {
        path: '**',
        redirectTo: '/games'
    }
];

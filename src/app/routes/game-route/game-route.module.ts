import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ROUTES } from './game-route.routes';
import { RouterModule } from '@angular/router';
import { GameRouteComponent } from './game-route.component';
import { BolCoreModule } from '../../modules/bol-core/bol-core.module';

@NgModule({
    imports: [
        CommonModule,
        BolCoreModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        GameRouteComponent
    ]
})
export class GameRouteModule {
}

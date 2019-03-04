import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ROUTES } from './auth-route.routes';
import { RouterModule } from '@angular/router';
import { AuthRouteComponent } from './auth-route.component';
import { BolCoreModule } from '../../modules/bol-core/bol-core.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        BolCoreModule,
        FormsModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        AuthRouteComponent
    ]
})
export class AuthRouteModule {
}

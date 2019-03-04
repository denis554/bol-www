import { Component, OnInit } from '@angular/core';
import { AppBootstrapService } from './app-bootstrap.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'app';

    constructor(private appBootstrapService: AppBootstrapService) {

    }

    ngOnInit() {
        this.appBootstrapService.init();
    }
}

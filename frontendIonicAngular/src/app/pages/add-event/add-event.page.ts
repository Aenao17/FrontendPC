import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'app-add-event',
    templateUrl: './add-event.page.html',
    styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {

    constructor(private auth: AuthService) { }

    ngOnInit() {
    }

    logout() {
        this.auth.logout();
    }

    addEvent() {

    }

}

import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from '../../interfaces/event';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-event',
    templateUrl: './event.page.html',
    styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
    public event: any

    constructor(
        private eventService: EventService,
        private activatedRoute: ActivatedRoute
    ) { }

    async ngOnInit() {
        const id = this.activatedRoute.snapshot.params['id'] as any;
        try {
            console.log("dsdasdadsa" ,id);
            this.event = await this.eventService.getEvent(id);
            console.log(this.event);
        } catch (err) {
            console.error(err);
        }
    }
}

import { ChangeDetectorRef, Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { Event } from '../interfaces/event';
import { EventService } from '../services/event.service';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage  {
    public events: Event[] = [
    ];
    public participa: any[] =[];

    //public currentUser = 'John Doe';

    constructor(
        private eventService: EventService,
        private storage: StorageService,
        private auth: AuthService,
        private router: Router,
        private navCtrl: NavController,
        private cdr: ChangeDetectorRef
    ) { }



    async ionViewWillEnter() {
        try {

            this.events = await this.eventService.getEvents() as Event[];
            for (let event of this.events){
              event.image = "data:image/jpeg;base64," + event.image;
              console.log("Hereee"+event.image);
              let parts = event.participants as number[]
              const user:any = await this.auth.getByUsername(await this.storage.get("username"));
              for (let part of parts){
                if(part==user.id){
                  this.participa.push(event.id);
                  break;
                }
              }
            }
            console.log(this.participa);

        } catch (err) {
            console.error(err);
        }
    }

    // Typing event as 'Event' to fix implicit 'any' type
    async joinEvent(event: Event) {
        console.log('Joining event:', event);
        this.participa.push(event.id);
        const user:any = await this.auth.getByUsername(await this.storage.get("username"));
        this.eventService.joinEvent(Number(event.id),Number(user.id));
        event.participantCount = event.participantCount + 1;
    }

    // Typing event as 'Event' to fix implicit 'any' type
    viewEvent(event: Event) {
        console.log('Viewing event:', event);
        this.router.navigate(['event', event.id]);
    }

    addEvent(){
        this.router.navigate(['add-event']);
    }


    logout() {
        this.auth.logout();
    }

    onLogoClick($event: MouseEvent) {
        this.router.navigate(['home']);
    }
}

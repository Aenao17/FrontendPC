import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
export class HomePage implements OnInit {
    public events: Event[] = [
    ];

    public currentUser = 'John Doe';

    constructor(
        private eventService: EventService,
        private storage: StorageService,
        private auth: AuthService,
        private router: Router,
        private navCtrl: NavController,
        private cdr: ChangeDetectorRef
    ) { }

    async ngOnInit() {
    }

    async ionViewWillEnter() {
        try {
            this.events = await this.eventService.getEvents() as Event[];
            for (let event of this.events){
              event.image = "data:image/jpeg;base64," + event.image;
            }

        } catch (err) {
            console.error(err);
        }
    }

    // Typing event as 'Event' to fix implicit 'any' type
    joinEvent(event: Event) {
        console.log('Joining event:', event);
        // Add logic to handle joining event
    }

    // Typing event as 'Event' to fix implicit 'any' type
    viewEvent(event: Event) {
        console.log('Viewing event:', event);
        this.router.navigate(['event', event.id]);
    }

    addEvent(){
        this.router.navigate(['add-event']);
    }

    addComment(post: { newComment: string; comments: Array<{ author: string; text: string }> }) {
        if (post.newComment.trim()) {
            post.comments.push({
                author: this.currentUser, // Use dynamic current user here
                text: post.newComment,
            });
            post.newComment = ''; // Reset the input field after adding a comment
        }
    }

    logout() {
        this.auth.logout();
    }

    onLogoClick($event: MouseEvent) {
        this.router.navigate(['home']);
    }
}

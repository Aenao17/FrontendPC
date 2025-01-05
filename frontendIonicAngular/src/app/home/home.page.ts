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
        try {
            this.events = await this.eventService.getEvents() as Event[];
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
        this.navCtrl.navigateForward("/event", { replaceUrl: true, skipLocationChange: false, state: {
            id: event.id
        } });
        this.cdr.markForCheck();
        // this.router.navigateByUrl(`/event/${event.id}`);
    }

    addEvent(){
        // this.router.navigateByUrl('/add-event');
        this.navCtrl.navigateForward("/add-event", { replaceUrl: true, skipLocationChange: false });
        this.cdr.markForCheck();
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
        this.navCtrl.navigateBack("/home", { replaceUrl: true, skipLocationChange: false });
        this.cdr.detectChanges();
    }

  goToAddPost() {
    this.router.navigate(['/post']);
  }
}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  public event: any; // Define the event object

  constructor(
    private auth: AuthService,
    private navCtrl: NavController,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Assign sample data to the event object
    this.event = {
      name: 'Sample Event',
      description: 'This is a sample event description.',
      location: 'Sample Location',
      date: new Date(),
      image: 'https://via.placeholder.com/600x400',
      posts: [
        {
          id: 1,
          name: 'Post 1',
          description: 'This is the first post.',
          image: 'https://via.placeholder.com/400x300',
          comments: [{ user: { fullname: 'John Doe' }, message: 'Great post!' }],
          newComment: '',
        },
        {
          id: 2,
          name: 'Post 2',
          description: 'This is the second post.',
          image: 'https://via.placeholder.com/400x300',
          comments: [],
          newComment: '',
        },
      ],
    };
  }

  /**
   * Logs out the user using the AuthService.
   */
  logout(): void {
    this.auth.logout();
    console.log('User logged out');
  }

  /**
   * Handles navigation to the home page when the logo is clicked.
   * @param $event - The MouseEvent triggered by the logo click.
   */
  onLogoClick($event: MouseEvent): void {
    this.navCtrl.navigateBack("/home", { replaceUrl: true, skipLocationChange: false });
    this.cdr.detectChanges();
    console.log('Navigated back to home');
  }
}

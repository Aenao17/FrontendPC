import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { EventService } from "../../services/event.service";
import { Router } from "@angular/router";
import { IonDatetime, NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit, AfterViewInit {

  title: string = '';
  description: string = '';
  date: Date = new Date();
  dateTimestamp: number = 0;
  location: string = '';
  formattedDate: string = '';
  imageUrl: string = '';
  showDatePicker: boolean = false; // Flag to control visibility of datetime picker

  @ViewChild('datePicker', { static: false }) datePicker!: IonDatetime; // Using the non-null assertion operator

  constructor(private auth: AuthService, private eventService: EventService, private router: Router,
    private navCtrl: NavController,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    console.log('Initial values:', this.title, this.description, this.location, this.date);
  }

  // This lifecycle hook ensures that the `ViewChild` is available
  ngAfterViewInit() {
    // If needed, additional logic can be added here to handle the reference after the view is initialized
    console.log("afterViewInit");
  }

  // Logout functionality
  logout(): void {
    this.auth.logout();
  }

  // Open Date Picker
  openDatePicker(): void {
    this.showDatePicker = !this.showDatePicker; // Toggle the visibility of the datetime picker
  }

  // Handle date change
  onDateChange(event: any): void {
    this.date = new Date(event.detail.value);
    console.log(typeof(this.date));
    console.log("DAta selectata" + this.date);
    this.formattedDate = new Date(this.date).toLocaleString();
    this.dateTimestamp = this.date.getTime() / 1000;
    console.log("TIme starmp", this.dateTimestamp);
  }

  // Add event to the server
  async addEvent(): Promise<void> {
    // Basic form validation
    if (!this.title || !this.description || !this.location) {
      alert('Please fill all the fields.');
      return;
    }

    try {
      // Call the event service to add the event without image
      const response = await this.eventService.addEvent(this.title, this.description, this.location, this.dateTimestamp, this.imageUrl);
      console.log('Event added successfully:', response);

      // Optionally, redirect after success
      this.router.navigate(['/events']);  // Example redirection

    } catch (error) {
      console.error('Error adding event:', error);
      // alert('An error occurred while adding the event. Please try again.');
    }
  }
  onLogoClick($event: MouseEvent) {
    this.navCtrl.navigateBack("/home", { replaceUrl: true, skipLocationChange: false });
    this.cdr.detectChanges();
  }
}

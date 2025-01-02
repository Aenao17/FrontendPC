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
  location: string = '';
  date: Date = new Date();
  formattedDate: string = '';
  showDatePicker: boolean = false; // Toggles the datetime picker visibility
  dateTimestamp: number = 0;

  @ViewChild('datePicker', { static: false }) datePicker!: IonDatetime;

  constructor(
    private auth: AuthService,
    private eventService: EventService,
    private router: Router,
    private navCtrl: NavController,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Initialize with default values or perform necessary setup
    console.log('Component initialized with values:', {
      title: this.title,
      description: this.description,
      location: this.location,
      date: this.date
    });
  }

  ngAfterViewInit(): void {
    // Perform actions that require the view to be fully initialized
    console.log("View initialized");
  }

  /**
   * Logs out the user using the AuthService.
   */
  logout(): void {
    this.auth.logout();
    console.log('User logged out');
  }

  /**
   * Toggles the visibility of the date picker.
   */
  openDatePicker(): void {
    this.showDatePicker = !this.showDatePicker;
  }

  /**
   * Updates the date and its formatted representation based on user selection.
   * @param event - Event object containing the selected date value.
   */
  onDateChange(event: any): void {
    const selectedDate = event.detail?.value;
    if (selectedDate) {
      this.date = new Date(selectedDate);
      this.formattedDate = this.date.toLocaleString(); // Format for display
      this.dateTimestamp = Math.floor(this.date.getTime() / 1000); // Convert to UNIX timestamp
      console.log('Selected Date:', this.formattedDate, 'Timestamp:', this.dateTimestamp);
    } else {
      console.error('Invalid date selected');
    }
  }

  /**
   * Handles the submission of the event form.
   */
  async addEvent(): Promise<void> {
    // Validate form fields
    if (!this.title || !this.description || !this.location) {
      alert('Please fill all the fields.');
      return;
    }

    try {
      // Add event using EventService
      const response = await this.eventService.addEvent(
        this.title,
        this.description,
        this.location,
        this.dateTimestamp,
        '' // Image is not provided in this example
      );
      console.log('Event added successfully:', response);

      // Show success message and redirect
      alert('Event added successfully!');
      this.router.navigate(['/events']); // Navigate to the events page

    } catch (error) {
      console.error('Error adding event:', error);
      alert('An error occurred while adding the event. Please try again.');
    }
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

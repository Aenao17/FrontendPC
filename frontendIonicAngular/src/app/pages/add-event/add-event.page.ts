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
  previewImage: String = '';
  imageUrl: String = '';
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
    console.log(typeof (this.date));
    console.log("DAta selectata" + this.date);
    this.formattedDate = new Date(this.date).toLocaleString();
    this.dateTimestamp = this.date.getTime();
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
      var user = this.auth.getUsername();
      var userr = await this.auth.getByUsername(user);
      console.log("USERRRR: "+userr);
      const response = await this.eventService.addEvent(this.title, this.description, this.location, this.dateTimestamp, this.imageUrl, userr);
      console.log('Event added successfully:', response);

      // Optionally, redirect after success
      this.router.navigate(['/home']);

    } catch (error) {
      console.error('Error adding event:', error);
      // alert('An error occurred while adding the event. Please try again.');
    }
  }
  onLogoClick($event: MouseEvent) {
    // this.navCtrl.navigateBack("/home", { replaceUrl: true, skipLocationChange: false });
    this.router.navigate(['/home']);
  }

  onChooseFile(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0]; // Selectăm primul fișier (dacă sunt mai multe)
      const reader = new FileReader();

      // Citim fișierul și îl convertim în Base64
      reader.onload = () => {
        const base64String = reader.result as String;// Conversia în Base64
        this.imageUrl = base64String.slice(23);
        console.log(base64String);
        this.previewImage = base64String; // Stocăm imaginea pentru previzualizare
      };

      reader.onerror = (error) => {
        console.error('Eroare la citirea fișierului:', error);
      };

      reader.readAsDataURL(file); // Începem citirea fișierului
    } else {
      console.warn('Niciun fișier selectat.');
    }
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { AuthService } from "./auth.service";
import { Event } from "../interfaces/event";

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = `${environment.apiUrl}/events`; // Base URL for the events API

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Get all events
  public getEvents() {
    return lastValueFrom(this.http.get(this.apiUrl));
  }

  // Get a single event by ID
  public getEvent(id: string) {
    console.log(id); // Log the event ID for debugging
    return lastValueFrom(this.http.get(`${this.apiUrl}/${id}`));
  }

  // Add a new event dynamically
  addEvent(title: string, description: string, location: string, date: number, imageUrl: string): Promise<any> {
    const userId = this.authService.getId(); // Get the logged-in user's ID from the AuthService

    const body: Event = {
      id:'',
      name: title,
      description: description,
      date: new Date(date), // Convert the provided date to a Date object
      participantCount: 0, // Default participant count
      location: location,
      image: imageUrl,
      organizer: {
        id: this.authService.getId(),
        username: this.authService.getUsername(),
        password: '', // Do not include password when creating events
        fullname: this.authService.getFullName(),
        email: this.authService.getEmail(),
        role: 'USER'
      },
      posts: [] // Initialize with an empty list of posts
    };

    return lastValueFrom(this.http.post(`${this.apiUrl}`, body)); // Send the POST request to create the event
  }
}

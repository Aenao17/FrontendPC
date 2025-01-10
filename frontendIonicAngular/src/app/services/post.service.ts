import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment.prod";
import { lastValueFrom } from "rxjs";
import { AuthService } from "./auth.service";
import {Post} from "../interfaces/post";
@Injectable({
  providedIn: 'root',
})
export class PostService {
  // Define your API endpoint
  private apiUrl = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Add a new post
   * @param postData - The post data to be added
   * @returns An Observable that will resolve with the created post
   */
  addPost(
    name: string,
    description: string,
    imageUrl: string,
    eventId?: number
  ): Promise<any> {
    // Get the logged-in user's ID and other user information from the AuthService
    const userId = this.authService.getId();

    // Build the Post object to be sent to the server
    // @ts-ignore
    const body: Post = {
      name: name,
      description: description,
      image: imageUrl,
      eventId: eventId, // Optional event ID
    };

    // Use HttpClient to send the POST request
    return lastValueFrom(this.http.post(this.apiUrl, body));
  }

}

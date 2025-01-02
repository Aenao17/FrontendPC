import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Post} from "../interfaces/post";
@Injectable({
  providedIn: 'root',
})
export class PostService {
  // Define your API endpoint
  private apiUrl = 'https://your-api-endpoint.com/posts';

  constructor(private http: HttpClient) {}

  /**
   * Add a new post
   * @param postData - The post data to be added
   * @returns An Observable that will resolve with the created post
   */
  addPost(postData: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, postData);
  }
}

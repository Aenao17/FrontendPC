import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from 'src/app/interfaces/comment';
import { Post } from 'src/app/interfaces/post';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = `${environment.apiUrl}/comments`; // API URL for managing comments

  constructor(private http: HttpClient) {}

  // Add a new comment
  addComment(message: string, postId: number, userId: string): Promise<Comment> {
    const body = {
      message: message,
      post: { id: postId },
      user: { id: userId },
    };

    return lastValueFrom(this.http.post<Comment>(this.apiUrl, body));
  }

  // Get all comments for a post
  getCommentsByPost(postId: number): Promise<Comment[]> {
    return lastValueFrom(this.http.get<Comment[]>(`${this.apiUrl}?postId=${postId}`));
  }
}

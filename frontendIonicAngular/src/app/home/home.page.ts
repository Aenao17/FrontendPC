import { Component } from '@angular/core';

// Define an interface for the event structure
interface Event {
  title: string;
  image: string;
  date: string;
  description: string;
  posts: Array<{
    title: string;
    content: string;
    comments: Array<{ author: string; text: string }>;
    newComment: string;
  }>;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  events: Event[] = [
    {
      title: 'Event 1',
      image: 'assets/icon/images.png',
      date: '2024-11-12',
      description: 'Description of Event 1',
      posts: [
        {
          title: 'Post 1',
          content: 'Content for post 1',
          comments: [
            { author: 'User1', text: 'Great post!' },
            { author: 'User2', text: 'Thanks for sharing!' },
          ],
          newComment: '',
        },
        {
          title: 'Post 2',
          content: 'Content for post 2',
          comments: [
            { author: 'User3', text: 'Interesting thoughts.' },
          ],
          newComment: '',
        },
      ],
    },
    {
      title: 'Event 2',
      image: 'event2.jpg',
      date: '2024-11-14',
      description: 'Description of Event 2',
      posts: [],
    },
  ];

  currentUser = 'John Doe'; // Example current user, replace with actual authentication

  // Typing event as 'Event' to fix implicit 'any' type
  joinEvent(event: Event) {
    console.log('Joining event:', event);
    // Add logic to handle joining event
  }

  // Typing event as 'Event' to fix implicit 'any' type
  viewEvent(event: Event) {
    console.log('Viewing event:', event);
    // Add logic to view event details
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
}

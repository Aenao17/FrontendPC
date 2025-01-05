import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { PostService } from "../../services/post.service";
import { Router } from "@angular/router";
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit, AfterViewInit {

  name: string = '';
  description: string = '';
  image: string = '';
  eventId?: number;

  constructor(
    private auth: AuthService,
    private postService: PostService,
    private router: Router,
    private navCtrl: NavController,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('Component initialized with values:', {
      name: this.name,
      description: this.description,
      image: this.image,
      eventId: this.eventId
    });
  }

  ngAfterViewInit(): void {
    console.log("View initialized");
  }

  async addPost(): Promise<void> {
    if (!this.name || !this.description || !this.image) {
      alert('Please fill all the required fields.');
      return;
    }

    try {
      const response = await this.postService.addPost(
        this.name,
        this.description,
        this.image,
        this.eventId,
      );
      alert('Post added successfully!');
      this.router.navigate(['/posts']);
    } catch (error) {
      console.error('Error adding post:', error);
      alert('An error occurred while adding the post. Please try again.');
    }
  }

  logout(): void {
    this.auth.logout();
  }

  onLogoClick($event: MouseEvent): void {
    this.navCtrl.navigateBack("/home", { replaceUrl: true, skipLocationChange: false });
    this.cdr.detectChanges();
  }
}

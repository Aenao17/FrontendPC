import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from "rxjs";
import { PostService } from "../../services/post.service";
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { TaskInterface } from 'src/app/interfaces/task';
@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {


  public eventId = '';
  public event: any
  public postContentName: string = '';
  public postContentDesc: string = '';
  public posts: any = [];
  public stat1: string = "Activ";
  public stat2: any = "Activ";
  public imageUrl: string = "";
  public previewImage: string = "";
  public comments: { [key: number]: string } = {};
  public role: string = "USER";
  public taskForm: FormGroup;
  public createdTask: TaskInterface[] = [];
  public tasks: TaskInterface[] = [];


  constructor(
    private auth: AuthService,
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private storage: StorageService,
    private fb: FormBuilder,
    private taskService: TaskService
  ) {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      deadline: ['', Validators.required],
      eventID: [null],
    });
  }

  async ngOnInit() {
    this.eventId = this.activatedRoute.snapshot.params['id'] as any;
    await this.initEvent();
    this.role = await this.storage.get("role");
    this.taskService.getAllAvailableTask(Number(this.eventId)).then((result) => {
      console.log("Finlanda");
      this.tasks = result;
    });
  }

  public async initEvent() {
    try {
      this.event = await this.eventService.getEvent(this.eventId);
      this.event.image = "data:image/jpeg;base64," + this.event.image;
    } catch (err) {
      console.error(err);
    }
    this.posts = this.event.posts;
    for (let post of this.posts) {
      post.image = "data:image/jpeg;base64," + post.image;
    }
  }

  onChooseFile(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0]; // Selectăm primul fișier (dacă sunt mai multe)
      const reader = new FileReader();

      // Citim fișierul și îl convertim în Base64
      reader.onload = () => {
        const base64String = reader.result as string; // Conversia în Base64
        this.imageUrl = base64String.slice(22);
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

  async makePost() {
    let name = this.postContentName;
    let desc = this.postContentDesc;

    try {
      await this.postService.addPost(name, desc, this.imageUrl, this.event.id);
    } catch (err) {
      console.error(err);
      return;
    }

    this.initEvent().then(() => { })
      .catch((err) => {
        console.error(err);
      });
  }

  async addComment(postId: number) {
    let comment = this.comments[postId]; // Get the comment for this post
    if (!comment || comment.trim() === "") return;

    try {
      await this.postService.addComment(postId, comment);
      this.comments[postId] = ""; // Clear the comment input for this post
      await this.initEvent(); // Refresh posts and comments
    } catch (err) {
      console.error(err);
    }
  }

  handleClick(task: TaskInterface) {
      this.taskService.changeStatusTask(task.name, "IN_PROGRESS").then((result) => {
        alert("Task-ul ti-a fost asignat!");
        task.status = result.status;
      })
  }

  logout() {
    this.auth.logout();
  }

  onLogoClick($event: MouseEvent) {
    this.router.navigate(['home']);
  }

  createTask() {
    if (this.taskForm.valid) {
      this.taskForm.patchValue({
        eventID: this.eventId
      })

      this.taskService.createTask(this.taskForm.value).then((result: TaskInterface) => {
        alert("S-a creat task-ul");
        this.createdTask.push(result);
        console.log(this.createdTask);
      })
    }
  }
}

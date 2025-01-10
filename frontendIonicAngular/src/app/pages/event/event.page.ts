import {Component, OnInit} from '@angular/core';
import {EventService} from 'src/app/services/event.service';
import {ActivatedRoute} from '@angular/router';
import {lastValueFrom} from "rxjs";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  public event: any
  public postContentName: string = '';
  public postContentDesc: string = '';
  public posts: any = [];
  public stat1: string = "Activ";
  public stat2: any = "Activ";
  public imageUrl: string ="";
  public previewImage: string="";

  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
  ) {
  }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'] as any;
    console.log(this.activatedRoute.snapshot);
    let idL;
    if (typeof id == 'string') {
      idL = parseInt(id);
    } else {
      idL = id;
    }
    try {
      this.event = await this.eventService.getEvent(idL);
    } catch (err) {
      console.error(err);
    }
    this.posts = this.event.posts;
  }

  onChooseFile(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0]; // Selectăm primul fișier (dacă sunt mai multe)
      const reader = new FileReader();

      // Citim fișierul și îl convertim în Base64
      reader.onload = () => {
        const base64String = reader.result as string; // Conversia în Base64
        this.imageUrl = base64String;
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

    this.postService.addPost(name,desc, this.previewImage,this.event.id);
  }

  handleClick($event: MouseEvent, number: number) {
    {
      alert("Task-ul ti-a fost asignat!");
      if (number === 1) {
        this.stat1 = "In progres";
      } else {
        this.stat2 = "In progres";
      }
    }
  }
}

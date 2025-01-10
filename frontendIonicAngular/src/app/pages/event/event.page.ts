import {Component, OnInit} from '@angular/core';
import {EventService} from 'src/app/services/event.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  public event: any
  public postContent: string = '';
  public posts: any = [];
  public stat1: string = "Activ";
  public stat2: any = "Activ";

  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'] as any;
    let idL;
    if (typeof id == 'string') {
      idL = parseInt(id);
    } else {
      idL = id;
    }
    idL = 1;
    try {
      this.event = await this.eventService.getEvent(idL);
      console.log(this.event);
    } catch (err) {
      console.error(err);
    }

    let user = {name: 'calin'};
    let content = 'WOOOW';
    let post = {content, user};
    this.posts.push(post);
    setTimeout(() => {
      this.stat1 = "Gata";
    }, 20000);
  }


  async makePost() {
    let user = {name: 'calin'};
    const content = this.postContent;
    let post = {content, user};
    this.posts.push(post);
    console.log(this.posts);
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

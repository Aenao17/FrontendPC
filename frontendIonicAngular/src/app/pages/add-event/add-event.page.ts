import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import {EventService} from "../../services/event.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-add-event',
    templateUrl: './add-event.page.html',
    styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {

  title:string = '';
  description:string = '';
  imageUrl:string = '';
  date:Date = new Date();
  location:string ='';

    constructor(private auth: AuthService, private eventService: EventService, private router: Router) { }
  selectedFile: File | null = null;

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }


  ngOnInit() {
    console.log(this.selectedFile);
    }

    logout() {
        this.auth.logout();
    }

    async addEvent():Promise<any> {
    const response= await this.eventService.addEvent(this.title, this.description, this.location, this.date, this.imageUrl);
    }

}

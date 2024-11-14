import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { environment } from "src/environments/environment.prod";
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root',
})
export class EventService {
    private apiUrl = `${environment.apiUrl}/events`;

    constructor(private http: HttpClient, private authService: AuthService) { }

    public getEvents() {
        return lastValueFrom(this.http.get(this.apiUrl));
    }

    public getEvent(id: string) {
        console.log(id);
        return lastValueFrom(this.http.get(`${this.apiUrl}/${id}`));
    }

    addEvent(title: string, description: string, location:string, date:Date, imageUrl: string): Promise<any> {

      const body = {
        id:1,
        name: title,
        description: description,
        date:date.toISOString(),
        participantCount: 0,
        location: location,
        image: imageUrl,
        organizer:{
          id: this.authService.getId(),
          username: 'gabi',
          password: 'gabi',
          fullname: 'gabi',
          email: 'gabi@gabi.com',
        },
        posts:[]
      };
      return lastValueFrom(this.http.post(`${this.apiUrl}`, body));
    }
}

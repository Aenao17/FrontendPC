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

    public getEvent(id: any) {
        console.log(id);
        if(typeof id == 'string') {
        id = parseInt(id);}
        return lastValueFrom(this.http.get(`${this.apiUrl}/${id}`));
    }

    addEvent(title: string, description: string, location:string, date: number, imageUrl: String): Promise<any> {
      console.log(date);
      // let aux_date = dat
      const body = {
        id:1,
        name: title,
        description: description,
        date:date,
        participantCount: 0,
        location: location,
        image: imageUrl,
        organizer:{
          id: 2,
          username: 'admin',
          password: 'admin',
          fullname: 'calin',
          email: 'navadarucalin@yahoo.com',
        },
        posts:[]
      };
      return lastValueFrom(this.http.post(`${this.apiUrl}`, body));
    }

}

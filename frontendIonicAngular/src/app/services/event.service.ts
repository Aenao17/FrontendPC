import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { environment } from "src/environments/environment.prod";
import {AuthService} from "./auth.service";
import {User} from "../interfaces/user";

@Injectable({
    providedIn: 'root',
})
export class EventService {
    private apiUrl = `${environment.apiUrl}/events`;

    constructor(private http: HttpClient, private authService: AuthService) { }

    public getEvents() {
        var x = lastValueFrom(this.http.get(this.apiUrl));
        return x;
    }

    public getEvent(id: any) {
        console.log(id);
        if(typeof id == 'string') {
        id = parseInt(id);}
        return lastValueFrom(this.http.get(`${this.apiUrl}/${id}`));
    }

    addEvent(title: string, description: string, location:string, date: number, imageUrl: String, organizer: any): Promise<any> {
      console.log("VR AICI "+JSON.stringify(organizer));
      // let aux_date = dat
      const body = {
        id:1,
        name: title,
        description: description,
        date:date,
        participantCount: 0,
        location: location,
        image: imageUrl,
        organizer: organizer,
        posts:[],
        participants:[]
      };
      return lastValueFrom(this.http.post(`${this.apiUrl}`, body));
    }

    joinEvent(id: number, idU:number){
      const body = {
      }
      console.log(body);
      return lastValueFrom(this.http.post(`${this.apiUrl}/join/${id}/${idU}`, body));
    }

}

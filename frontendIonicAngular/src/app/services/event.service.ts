import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { environment } from "src/environments/environment.prod";

@Injectable({
    providedIn: 'root',
})
export class EventService {
    private apiUrl = `${environment.apiUrl}/events`;

    constructor(private http: HttpClient) { }

    public getEvents() {
        return lastValueFrom(this.http.get(this.apiUrl));
    }

    public getEvent(id: string) {
        return lastValueFrom(this.http.get(`${this.apiUrl}/${id}`));
    }
}
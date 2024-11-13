import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { environment } from "src/environments/environment.prod";

@Injectable({
    providedIn: 'root',
})
export class EventService {
    constructor(private http: HttpClient) { }
}
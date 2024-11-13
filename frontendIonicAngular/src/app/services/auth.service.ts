import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = 'https://localhost:8080'; // Adjust API URL

    constructor(private http: HttpClient) { }

    login(username: string, password: string): Promise<any> {
        return lastValueFrom(this.http.post(`${this.apiUrl}/login`, { username, password }));
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/users'; // Adjust API URL

    constructor(private http: HttpClient) { }

  login(username: string, password: string): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      id: 1,
      role: 'USER',
      username: username,
      password: password,
      organizedEvents: [],
      comments: []
    }
    return lastValueFrom(this.http.post(`${this.apiUrl}/login`, body));
  }

  signup(username: string, password: string): Promise<any> {
    //make a signup request to the server
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      id: 1,
      role: 'USER',
      username: username,
      password: password,
      organizedEvents: [],
      comments: []
    };
    return lastValueFrom(this.http.post(`${this.apiUrl}/signup`, body));
  }
}

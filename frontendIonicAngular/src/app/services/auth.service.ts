import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/users'; // Adjust API URL

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
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
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  signup(username: string, password: string): Observable<any> {
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
    return this.http.post(`${this.apiUrl}/signup`, body );
  }
}

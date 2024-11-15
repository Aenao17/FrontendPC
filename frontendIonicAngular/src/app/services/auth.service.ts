import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';
import { NavController } from '@ionic/angular';
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = `${environment.apiUrl}/users`;
    private id: string = '';

    constructor(
        private http: HttpClient,
        private storage: StorageService,
        private router: Router,
        private navCtrl: NavController
    ) {
        setTimeout(() => {
            this.storage.get('id').then((id) => {
                this.id = id;
            }).catch((err) => {
                console.error(err);
            });
        }, 2000);
    }

    getId(): string {
      return this.id;
    }

    login(username: string, password: string): Promise<any> {
        // const headers = new HttpHeaders({
        //     'Content-Type': 'application/json'
        // });

        const body = {
            id: 1,
            role: 'USER',
            username,
            password,
            email: '',
            fullname: '',
            organizedEvents: [],
            comments: []
        }
        return lastValueFrom(this.http.post(`${this.apiUrl}/login`, body));
    }

    signup(username: string, password: string, email: string, fullname: string): Promise<any> {
        // const headers = new HttpHeaders({
        //     'Content-Type': 'application/json'
        // });

        const body = {
            id: 1,
            role: 'USER',
            username,
            password,
            email,
            fullname,
            organizedEvents: [],
            comments: []
        };
        return lastValueFrom(this.http.post(`${this.apiUrl}/signup`, body));
    }


    logout() {
        this.storage.remove('id').then(() => {
            // this.router.navigateByUrl('/login');
            this.navCtrl.navigateRoot("/login");
        }).catch((err) => {
            console.error(err);
        });
    }
}

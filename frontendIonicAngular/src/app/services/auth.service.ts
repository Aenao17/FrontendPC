import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';
import { NavController } from '@ionic/angular';
import { User } from '../interfaces/user';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private apiUrl = `${environment.apiUrl}/users`;
	private id: string = '';
	private username: string = '';
	private fullname: string = '';
	private email: string = '';

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


			this.storage.get('username').then((username) => {
				this.username = username;
			}).catch((err) => {
				console.error(err);
			});

			this.storage.get('fullname').then((fullname) => {
				this.fullname = fullname;
			}).catch((err) => {
				console.error(err);
			});

			this.storage.get('email').then((email) => {
				this.email = email;
			}).catch((err) => {
				console.error(err);
			});
		}, 2000);
	}

	getId(): string {
		return this.id;
	}

	getUsername(): string {
		return this.username;
	}

	getFullName(): string {
		return this.fullname;
	}

	getEmail(): string {
		return this.email;
	}

	// Login method
	login(username: string, password: string): Promise<any> {
		const body = {
			username,
			password
		};

		return lastValueFrom(this.http.post(`${this.apiUrl}/login`, body));
	}

	// Signup method
	signup(username: string, password: string, email: string, fullname: string): Promise<any> {
		const body = {
			username: username,
			password: password,
			email: email,
			fullname: fullname
		};

		// After successful signup, store user data in storage
		return lastValueFrom(this.http.post(`${this.apiUrl}/signup`, body)).then((response: any) => {
			this.id = response.id;
			this.username = response.username;
			this.fullname = response.fullname;
			this.email = response.email;

			// Store values in local storage for persistence
			this.storage.set('id', this.id);
			this.storage.set('username', this.username);
			this.storage.set('fullname', this.fullname);
			this.storage.set('email', this.email);

			return response;
		});
	}

	// Logout method
	async logout() {
		this.navCtrl.navigateRoot("/login");
		try {
			await lastValueFrom(this.http.get(`${this.apiUrl}/logout`));
		} catch (err) {
			console.error(`Failed to remove token from server`, err);
		}
		this.storage.remove('_token').then(() => {
		}).catch((err) => {
			console.error(err);
		});
	}

	public getById(id: string) {
		return lastValueFrom(this.http.get(`${this.apiUrl}/${id}`));
	}

	public getByUsername(id: string) {
		return lastValueFrom(this.http.get(`${this.apiUrl}/username/${id}`));
	}

	public getAllUsers() {
		return lastValueFrom(this.http.get<User[]>(`${this.apiUrl}`));
	}

	public changeRole(id: string, role: string) {
		let _id = Number(id);
		return lastValueFrom(this.http.put<User>(`${this.apiUrl}/role`, {id: id, role: role}));
	}
}

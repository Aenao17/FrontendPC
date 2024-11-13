import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    username: string = '';
    password: string = '';
    errorMessage: string = '';

    constructor(
        private auth: AuthService,
        private storage: StorageService,
        private router: Router
    ) { }

    ngOnInit() { }

    async login() {
        try {
            // const response = await this.auth.login(this.username, this.password) as any;
            const response = {id: 123};
            await this.storage.set("id", response.id);
            this.router.navigateByUrl('/home');
        } catch (err) {
            console.error(err);
            this.errorMessage = 'Login failed. Please check your credentials and try again.';
        }
    }
}

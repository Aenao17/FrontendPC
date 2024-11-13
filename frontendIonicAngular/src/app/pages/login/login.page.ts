import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    username: string = '';
    password: string = '';
    errorMessage: string = '';

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() { }

    login(): void {
        this.authService.login(this.username, this.password).then(() => {
            this.router.navigate(['/home']);
        }).catch((err) => {
            // this.router.navigate(['/home']);
            console.error(err);
            this.errorMessage = 'Login failed. Please check your credentials and try again.';
        });
    }
}

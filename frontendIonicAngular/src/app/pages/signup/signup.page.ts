import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
    username: string = '';
    password: string = '';
    email: string = '';
    fullname: string = '';
    errorMessage: string = '';
    constructor(
        private auth: AuthService,
        private storage: StorageService,
        private router: Router,
        private navCtrl: NavController
    ) { }

    ngOnInit(): void {
        console.log("SignUp");
    }

    signup(): void {
        this.auth.signup(this.username, this.password, this.email, this.fullname).then(() => {
            // this.router.navigateByUrl('/login');
            this.navCtrl.navigateRoot("/login");
        }).catch(() => {
            this.errorMessage = 'Signup failed. Please try again.';
        });
    }
}

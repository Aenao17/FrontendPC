import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

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
    private router: Router
  ) { }

  ngOnInit(): void {
      
  }

  signup(): void {
    this.auth.signup(this.username, this.password, this.email, this.password).then(() => {
        this.router.navigateByUrl('/login');
      }).catch(() => {
        this.errorMessage = 'Signup failed. Please try again.';
      });
  }
}

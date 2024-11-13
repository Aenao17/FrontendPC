import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      // If login is successful, navigate to the home page
      () => {
        this.router.navigate(['/home']);
      },
      // If login fails, display an error message
      () => {
        this.errorMessage = 'Login failed. Please try again.';
      }
    );
  }
}

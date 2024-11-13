import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage  {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  constructor(private authService:AuthService, private router: Router) { }

  signup(): void {
    this.authService.signup(this.username, this.password).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      () => {
        this.errorMessage = 'Signup failed. Please try again.';
      }
    );
  }
}

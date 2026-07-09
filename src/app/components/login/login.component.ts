import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  message = '';

  constructor(private router: Router) {}

  onLogin(): void {
    const validUsername = 'admin';
    const validPassword = '123456';

    if (this.username === validUsername && this.password === validPassword) {
      this.message = 'Login successful! Redirecting to Home...';
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 500);
    } else {
      this.message = 'Invalid username or password.';
    }
  }
}

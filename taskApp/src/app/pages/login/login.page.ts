import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class LoginPage {
  email = '';
  password = '';
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.errorMsg = '';
    const email = this.email.trim();

    if (!email || !this.password) {
      this.errorMsg = 'Unesi email i lozinku.';
      return;
    }

    this.auth.login(email, this.password).subscribe({
      next: () => this.router.navigateByUrl('/home'),
      error: () => this.errorMsg = 'Login nije uspeo. Proveri podatke.'
    });
  }
}

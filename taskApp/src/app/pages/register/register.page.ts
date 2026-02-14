import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class RegisterPage {
  email = '';
  password = '';
  confirm = '';
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {}

  onRegister() {
    this.errorMsg = '';
    const email = this.email.trim();

    if (!email || !this.password) {
      this.errorMsg = 'Unesi email i lozinku.';
      return;
    }
    if (this.password !== this.confirm) {
      this.errorMsg = 'Lozinke se ne poklapaju.';
      return;
    }

    this.auth.register(email, this.password).subscribe({
      next: () => this.router.navigateByUrl('/home'),
      error: () => this.errorMsg = 'Registracija nije uspela. Probaj drugi email.'
    });
  }
}

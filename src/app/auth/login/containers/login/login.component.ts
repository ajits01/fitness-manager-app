import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
<<<<<<< HEAD
=======
import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';
import { Router } from '@angular/router';
>>>>>>> 04-angularfire-integration

@Component({
  selector: 'fma-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
<<<<<<< HEAD
  constructor() {}

  ngOnInit() {}

  loginUser(event: FormGroup) {
    console.log(event.value);
=======
  error: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  async loginUser(event: FormGroup) {
    const { email, password } = event.value;
    try {
      await this.authService.loginUser(email, password);
      this.router.navigate(['/']);
    } catch (err) {
      this.error = err.message;
    }
>>>>>>> 04-angularfire-integration
  }
}

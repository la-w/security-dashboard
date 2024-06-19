import { Component } from '@angular/core';
import {FormControl, Validators } from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge} from 'rxjs';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  errorMessage = '';

  constructor() {
    merge(this.email.statusChanges, this.password.statusChanges, this.email.valueChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else if (this.password.hasError('required')) {
      this.errorMessage = '';
    }
  }
}

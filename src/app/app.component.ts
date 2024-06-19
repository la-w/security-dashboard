import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenav} from '@angular/material/sidenav';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  title = 'security-dashboard';

  // Leaving sidenav out for now, as won't be used for now.
  // @ViewChild('sidenav') sidenav!: MatSidenav;
  
  logout() {
    // TODO implement logout
    console.log('logout');
  }
}

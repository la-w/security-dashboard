import { Component } from '@angular/core';
import { VulnerabilityListComponent } from "../vulnerability-list/vulnerability-list.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [VulnerabilityListComponent]
})
export class DashboardComponent {
    logout() {
        throw new Error('Method not implemented.');
    }

}

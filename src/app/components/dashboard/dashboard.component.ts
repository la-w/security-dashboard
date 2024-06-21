import { Component } from '@angular/core';
import { VulnerabilityChartsComponent } from '../vulnerability-charts/vulnerability-charts.component';
import { VulnerabilityListComponent } from "../vulnerability-list/vulnerability-list.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [VulnerabilityListComponent, VulnerabilityChartsComponent]
})
export class DashboardComponent {
    logout() {
        throw new Error('Method not implemented.');
    }

}

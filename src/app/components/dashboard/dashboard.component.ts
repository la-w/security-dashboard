import { Component } from '@angular/core';
import { FindingChartsComponent } from '../finding-charts/finding-charts.component';
import { FindingListComponent } from "../finding-list/finding-list.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [FindingListComponent, FindingChartsComponent]
})
export class DashboardComponent {
    logout() {
        throw new Error('Method not implemented.');
    }

    pipelineId?: number;

    onPipelineIdChanged(pipelineId: number) {
        this.pipelineId = pipelineId;
    }
}

import { Component } from '@angular/core';
import { FindingsService } from '../../services/findings.service';
import { Finding, FailureLevel, SarifTool } from '../../models/findings.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { HighlightAuto } from 'ngx-highlightjs';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-finding-detail',
  standalone: true,
  imports: [RouterLink, SharedModule, HighlightAuto, CommonModule],
  templateUrl: './finding-detail.component.html',
  styleUrl: './finding-detail.component.scss'
})
export class FindingDetailComponent {
  finding?: any;
  checked = true;
  isLoading: boolean = true;
  // pipelineRun: any;

  constructor(private route: ActivatedRoute, private findingsService: FindingsService) { }

  ngOnInit() {
    // TODO: remove
    // this.pipelineRun = {
    //   pipelineId: 1,
    //   createdAt: new Date(),
    //   branch: 'dev',
    //   commitHash: '123456',
    //   repository: { name: 'juice-shop', url: 'git.git' }
    // }

    this.route.params.subscribe(params => {
      const id = +params['id'];
      // TODO: uncomment after implementing the service in backend

      // this.findingsService.getLatestPipelineRun().subscribe(pipelineRun => {
      //   this.pipelineRun = pipelineRun;
      // this.findingsService.getFindings(this.pipelineRun.pipelineId).subscribe(finding => {
      // this.findingsService.getFindings(1).subscribe(finding => {
      //   this.finding = finding.find(f => f.id === id);
      //   this.isLoading = false;
      // });
      // });

      this.findingsService.getFindingDetails(id).subscribe(finding => {
        this.finding = finding;

        

        if(this.finding?.findings != undefined && this.finding.findings.length > 0) {
          for(let toolFinding of this.finding.findings) {
            if(this.finding.snippet == undefined && toolFinding.snippet != undefined && toolFinding.snippet.length > 0) {
              this.finding.snippet = toolFinding.snippet;
            }

            if(this.finding.line == undefined) {
              this.finding.line = toolFinding.line != undefined ? toolFinding.line : toolFinding.snippetStartLine;
            }

            if(toolFinding.cvss31Vector) { this.finding.cvss31Vector = toolFinding.cvss31Vector; }
            if(toolFinding.cvss40Vector) { this.finding.cvss40Vector = toolFinding.cvss40Vector; }

            if(this.finding.webRequest == undefined && toolFinding.webRequest != undefined) {
              this.finding.webRequest = toolFinding.webRequest;
            }

            if(this.finding.webResponse == undefined && toolFinding.webResponse != undefined) {
              this.finding.webResponse = toolFinding.webResponse;
            }
          }
        }

        this.isLoading = false;
      });
    });
  // });

}

getDescriptionRowCount() : number {
  if(this.finding?.description == undefined) { return 3; }

  let lines = this.finding.description.split('\n');

  return Math.min(Math.max(3, lines.length), 10);
}

onToggleFalsePositive(event: MatSlideToggleChange) {
  let isFalsePositive = event.checked;

  if (this.finding === undefined) {
    console.error("Cannot set false positive on undefined finding");
    return;
  }

  this.findingsService
    .setFalsePositive(this.finding.id, isFalsePositive)
    .subscribe({
      next: () => {
        this.finding!.falsePositive = isFalsePositive;
      },
      error: (error) => {
        console.log(error);
      },
    });
}

}

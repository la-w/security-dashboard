import { Component, EventEmitter, OnInit, Output, ViewChild, } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FindingsService } from '../../services/findings.service';
import { Finding, FailureLevel, SarifTool } from '../../models/findings.model';
import { SharedModule } from '../../shared/shared.module';
import { transition, trigger, state, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, combineLatestWith } from 'rxjs';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
    selector: 'app-finding-list',
    standalone: true,
    imports: [SharedModule, CommonModule],
    templateUrl: './finding-list.component.html',
    styleUrls: ['./finding-list.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ])
    ]
})
export class FindingListComponent implements OnInit {

    displayedColumns: string[] = ['level', 'location', 'rule', 'detectionType'];

    originalDataSource: MatTableDataSource<any> = new MatTableDataSource();
    groupedByLevelDataSource: MatTableDataSource<any> = new MatTableDataSource();
    groupedByRuleDataSource: MatTableDataSource<any> = new MatTableDataSource();
    expandedElements: Set<any> = new Set();

    showFalsePositivesSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
    showFalsePositives$ = this.showFalsePositivesSubject.asObservable();

    findingsSubject: BehaviorSubject<Finding[]> = new BehaviorSubject([] as Finding[]);
    findings$ = this.findingsSubject.asObservable();

    isLoading: boolean = true;
    pipelineRun: any;

    repository!: string;
    repositoryList: string[] = ['juice-shop', 'todo-list', 'security-dashboard', 'security-dashboard-backend'];

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;

    @Output() pipelineIdChange: EventEmitter<number> = new EventEmitter();

    constructor(private router: Router, private findingsService: FindingsService) {
        this.repository = findingsService.repository;
    }

    ngOnInit(): void {
        this.findings$.pipe(combineLatestWith(this.showFalsePositives$)).subscribe(([findings, showFalsePositives]) => {
            for (let finding of findings) {
                finding.rule = finding.toolRule.name;
            }

            if (!showFalsePositives) {
                findings = findings.filter(finding => !finding.isFalsePositive);
            }

            this.originalDataSource.data = findings;
            let levels = this.originalDataSource.data.map(finding => finding.level).filter((value, index, self) => self.indexOf(value) === index).sort((a, b) => (FailureLevel[a] > FailureLevel[b] ? -1 : 1));
            this.groupedByLevelDataSource.data = [];
            for (let level of levels) {
                let findings = this.originalDataSource.data.filter(finding => finding.level === level);
                this.groupedByLevelDataSource.data.push({ level: level, isGroup: true, findings: findings, numberOfFindings: findings.length });
            }
            // Data must be reassigned to trigger the change detection
            this.groupedByLevelDataSource.data = [...this.groupedByLevelDataSource.data];

            let rules = this.originalDataSource.data.map(finding => finding.rule).filter((value, index, self) => self.indexOf(value) === index);
            this.groupedByRuleDataSource.data = [];
            for (let rule of rules) {
                let findings = this.originalDataSource.data.filter(finding => finding.rule === rule);
                this.groupedByRuleDataSource.data.push({ rule: rule, isGroup: true, findings: findings, numberOfFindings: findings.length });
            }
            this.groupedByRuleDataSource.data = this.groupedByRuleDataSource.data.sort((a, b) => (a.numberOfFindings > b.numberOfFindings ? -1 : 1));

            this.isLoading = false;
            setTimeout(() => {
                this.originalDataSource.paginator = this.paginator;
                this.originalDataSource.sort = this.sort;
            }, 10);
        });

        this.showFalsePositivesSubject.next(false);
        this.getFindings();
    }

    getFindings() {
        this.isLoading = true;
        // TODO: uncomment this after implementing the service in backend

        this.findingsService.getLatestPipelineRun().subscribe({
            next: pipelineRun => {
                this.pipelineRun = pipelineRun;

                this.pipelineIdChange.emit(this.pipelineRun.pipelineId);
                this.findingsService.getFindings(this.pipelineRun.pipelineId)
                    .subscribe(findings => this.findingsSubject.next(findings));

                // .subscribe(([findings, showFalsePositives]) => {
                // // this.findingsService.getFindings(1).subscribe(findings => {
                //     for(let finding of findings) {
                //         finding.rule = finding.toolRule.name;
                //     }

                //     if(!showFalsePositives) {
                //         findings = findings.filter(finding => finding.isFalsePositive);
                //     }

                //     this.originalDataSource.data = findings;
                //     let levels = this.originalDataSource.data.map(finding => finding.level).filter((value, index, self) => self.indexOf(value) === index).sort((a, b) => (FailureLevel[a] > FailureLevel[b] ? -1 : 1));
                //     for (let level of levels) {
                //         let findings = this.getFindingsByLevel(level);
                //         this.groupedByLevelDataSource.data.push({ level: level, isGroup: true, findings: findings, numberOfFindings: findings.length });
                //     }

                //     this.isLoading = false;
                //     setTimeout(() => {
                //         this.originalDataSource.paginator = this.paginator;
                //         this.originalDataSource.sort = this.sort;
                //     }, 10);
                // });
            }
            , error: err => {
                if (err instanceof HttpErrorResponse && err.status == 404) {
                    console.error("No pipeline run found for the current repository and branch.");
                    this.findingsSubject.next([]);
                    // this.originalDataSource.data = [];
                    // this.groupedByLevelDataSource.data = [];
                    this.pipelineIdChange.emit(0);
                    this.isLoading = false;
                }
            }
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.originalDataSource.filter = filterValue.trim().toLowerCase();

        if (this.originalDataSource.paginator) {
            this.originalDataSource.paginator.firstPage();
        }
    }

    toggleRow(row: any) {
        if (this.isRowExpanded(row)) {
            this.expandedElements.delete(row);
        } else {
            this.expandedElements.add(row);
        }
    }

    isRowExpanded(row: any): boolean {
        return this.expandedElements.has(row);
    }


    selectFinding(finding: Finding) {
        this.router.navigate(['/finding', finding.id]);
    }

    onToggleFalsePositives(event: MatSlideToggleChange) {
        this.showFalsePositivesSubject.next(event.checked);
    }

    onRepoChange(repo: string) {
        this.findingsService.repository = repo;
        this.getFindings();
    }


}


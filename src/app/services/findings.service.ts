import { Injectable, inject } from "@angular/core";
import { environment } from "../../environment";
import { Observable, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Finding, PipelineRun } from "../models/findings.model";

@Injectable({
  providedIn: "root",
})
export class FindingsService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUri = `${environment.apiBaseUri}/api/Findings`;
  repository: string = "juice-shop";
  branch: string = "dev";
  pipelineRun!: PipelineRun;

  getLatestPipelineRun(): Observable<PipelineRun> {
    let repository = this.repository;
    let branch = this.branch;
    return this.httpClient.get<PipelineRun>(`${this.apiUri}/GetLatestPipelineRun`, {
      params: { repository, branch },
    });
  }

  getFindings(pipelineId: number): Observable<Finding[]> {
    return this.httpClient.get<Finding[]>(`${this.apiUri}/Get`, {
      params: { pipelineId },
    });
  }

  getFindingDetails(findingId: number): Observable<Finding> {
    return this.httpClient.get<Finding>(`${this.apiUri}/GetDetails`, {
      params: { findingId },
    });
  }

  getChartData(pipelineId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUri}/GetChartData`, {
      params: { pipelineId },
    });
  }

  setFalsePositive(findingId: number, isFalsePositive: boolean): Observable<unknown> {
    return this.httpClient.post<unknown>(`${this.apiUri}/SetFalsePositive`, null, {
      params: { findingId, isFalsePositive },
    });
  }
}

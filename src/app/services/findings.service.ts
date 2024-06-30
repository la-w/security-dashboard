import { Injectable, inject } from "@angular/core";
import { environment } from "../../environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Finding } from "../models/findings.model";

@Injectable({
  providedIn: "root",
})
export class FindingsService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUri = `${environment.apiBaseUri}/api/Findings`;

  constructor() { }

  getFindings(pipelineId: number): Observable<Finding[]> {
    return this.httpClient.get<Finding[]>(`${this.apiUri}/Get`, {
      params: { pipelineId },
    });
  }

  getFinding(pipelineId: number): Observable<Finding[]> {
    return this.httpClient.get<Finding[]>(`${this.apiUri}/Get`, {
      params: { pipelineId },
    });
  }

  setFalsePositive(findingId: number, isFalsePositive: boolean) : Observable<unknown> {
    return this.httpClient.post<unknown>(`${this.apiUri}/SetFalsePositive`, {
      params: { findingId, isFalsePositive },
    });
  }
}

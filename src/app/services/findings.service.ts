import { Injectable, inject } from "@angular/core";
import { environment } from "../../environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class FindingsService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUri = `${environment.apiBaseUri}/api/Findings`;

  constructor() {}

  getFindings(pipelineId: number): Observable<unknown[]> {
    return this.httpClient.get<unknown[]>(`${this.apiUri}/Get`, {
      params: { pipelineId },
    });
  }
}

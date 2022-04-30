import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  candidatesUrl = `https://ynot-careers-backend.herokuapp.com/api/v1/candidates`;

  constructor(private http: HttpClient) {}
  postaCandidate(id: string, candidateDetails: any): Observable<any> {
    let data = {
      jobId: id,
      candidateDetails: candidateDetails,
    };
    return this.http.post(this.candidatesUrl, data);
  }
  getAllCandidates(): Observable<any> {
    return this.http.get(this.candidatesUrl);
  }
  getCandidatesbyId(id: string): Observable<any> {
    return this.http.get(`${this.candidatesUrl}/${id}`);
  }
  getCandidatesbyJobCount(id: string): Observable<any> {
    return this.http.get(`${this.candidatesUrl}/${id}/count`);
  }
}

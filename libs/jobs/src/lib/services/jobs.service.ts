import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../models/job.model';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  constructor(private http: HttpClient) {}
  jobsUrl = `https://ynot-careers-backend.herokuapp.com/api/v1/jobs`;
  postJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.jobsUrl, job);
  }
  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.jobsUrl);
  }
  getAllAvailableJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.jobsUrl}/available`);
  }
  updateJob(id: string, job: Job): Observable<Job> {
    return this.http.put<Job>(`${this.jobsUrl}/${id}`, job);
  }
  getJob(id: string): Observable<Job> {
    return this.http.get<Job>(`${this.jobsUrl}/${id}`);
  }
  deleteJob(id: string): Observable<any> {
    return this.http.delete(`${this.jobsUrl}/${id}`);
  }
  getAssociatedCategoryJobs(id: string): Observable<any> {
    return this.http.get<Object>(`${this.jobsUrl}/count/${id}`);
  }
}

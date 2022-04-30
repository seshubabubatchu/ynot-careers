import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Job, JobsService } from '@ynot-careers/jobs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ynot-careers-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  constructor(private jobservice: JobsService, private router: Router) {}

  ngOnInit(): void {
    this.getAllJobs();
    this.sortOptions = [
      { label: 'All Time', value: 'postedDate' },
      { label: 'Recent', value: '!postedDate' },
    ];
  }
  //declarations
  jobs: Job[] = [];
  subscriptions: Subscription[] = [];
  currentJob;
  sortOptions: any[];

  sortOrder: number;

  sortField: string;
  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
  //methods
  getAllJobs() {
    let sub1$ = this.jobservice.getAllAvailableJobs().subscribe((jobs) => {
      console.log(jobs);
      this.jobs = jobs;
    });
    this.subscriptions.push(sub1$);
  }
  navigateToJob(id: string) {
    let sub2$ = this.jobservice.getJob(id).subscribe((job: Job) => {
      this.currentJob = job;
      this.router.navigateByUrl(`/job/${id}`);
    });
    this.subscriptions.push(sub2$);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
    this.subscriptions = [];
  }
}

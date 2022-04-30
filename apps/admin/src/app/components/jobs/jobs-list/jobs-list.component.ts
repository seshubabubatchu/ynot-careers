import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Job, JobsService } from '@ynot-careers/jobs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ynot-careers-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css'],
})
export class JobsListComponent implements OnInit, OnDestroy {
  constructor(
    private jobService: JobsService,
    private messageService: MessageService,
    private location: Location,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getAllJobs();
  }

  //declarations
  jobs: Job[] = [];
  subscriptions: Subscription[] = [];
  //methods
  getAllJobs() {
    let sub1$ = this.jobService.getAllJobs().subscribe((jobs) => {
      this.jobs = jobs;
    });
    this.subscriptions.push(sub1$);
  }

  editJob(id: string) {
    this.router.navigateByUrl(`jobs/${id}`);
  }
  deleteJob(id: string) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //confirm action
        let sub2$ = this.jobService.deleteJob(id).subscribe(
          (data) => {
            console.log(data);
            this.messageService.add({
              severity: 'success',
              summary: 'Deleted Job',
            });
            this.jobService.getAllJobs().subscribe((jobs) => {
              this.jobs = jobs;
            });
            setTimeout(() => {
              this.location.back();
            }, 2000);
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error Deleting Job',
            });
            setTimeout(() => {
              this.location.back();
            }, 2000);
          }
        );
        this.subscriptions.push(sub2$);
      },
      reject: () => {
        //reject action
      },
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      console.log('unsubed');
      sub.unsubscribe();
    });
    this.subscriptions = [];
  }
}

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailService } from '@ynot-careers/email';
import { Job, JobsService } from '@ynot-careers/jobs';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ynot-careers-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
})
export class JobComponent implements OnInit, OnDestroy {
  constructor(
    private jobService: JobsService,
    private router: ActivatedRoute,
    private emailService: EmailService,
    private messageservice: MessageService
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.jobid = params.id;
    });
    this.getJob(this.jobid);
  }

  //declarations
  @ViewChild('emailform') emailForm: NgForm;
  job: Job;
  jobid: string;
  subscriptions: Subscription[] = [];
  //methods
  getJob(id: string) {
    let sub1$ = this.jobService.getJob(this.jobid).subscribe((job) => {
      this.job = job;
      console.log(this.job);
    });
    this.subscriptions.push(sub1$);
  }

  onemailformSubmit() {
    console.log(this.emailForm.value);
    let sub2$ = this.emailService
      .sendemail(this.emailForm.value)
      .subscribe((data) => {
        console.log(data);
      });
    this.subscriptions.push(sub2$);
  }
  sharethisJobEmail() {
    const emailBody = `
    <div style="display:'flex';justify-content:'flex-start';align-items:'flex-start';width:500px;margin:auto;">
  <p>Hey, Found an Intresting Opportunity that matches you</p>
  <p>Check this Job at YNOT Careers</p>
  <p>${this.job.title}</p>
  <p>Category : ${this.job.category.name}</p>
  <p>Location : ${this.job.location}</p>
  <p>Type : ${this.job.hiringType}</p>
</div>
    `;
    let sub3$ = this.emailService
      .sendTestemail(this.emailForm.value, emailBody)
      .subscribe(
        (data) => {
          this.messageservice.add({
            severity: 'success',
            summary: 'Email Sent',
          });
        },
        (error) => {
          console.log(error);
          this.messageservice.add({
            severity: 'success',
            summary: 'Email Sent',
          });
        }
      );
    this.subscriptions.push(sub3$);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe;
    });
    this.subscriptions = [];
  }
}

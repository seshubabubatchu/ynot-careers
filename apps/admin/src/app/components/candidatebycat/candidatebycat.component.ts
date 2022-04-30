import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidatesService } from '@ynot-careers/candidates';
import { EmailService } from '@ynot-careers/email';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ynot-careers-candidatebycat',
  templateUrl: './candidatebycat.component.html',
  styleUrls: ['./candidatebycat.component.css'],
})
export class CandidatebycatComponent implements OnInit, OnDestroy {
  constructor(
    private candidatesService: CandidatesService,
    private router: ActivatedRoute,
    private emailservice: EmailService,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      if (params.id) {
        // this.getCandidatesbyCategory(params.id);
        this.getCandidatesbyJobCount(params.id);
      }
    });
    // console.log(this.config);
    this.getcandidateDetail(this.config.data.candidateId);
  }
  //declrations
  candidates: any[] = [];
  candidate: any;
  candidateCount: { count: number };
  subscriptions: Subscription[] = [];
  //methods
  getcandidateDetail(id) {
    // console.log('hai insied');
    let sub1$ = this.candidatesService
      .getCandidatesbyId(id)
      .subscribe((candidate) => {
        this.candidate = candidate;
        console.log(this.candidate);
      });
    this.subscriptions.push(sub1$);
  }
  // getCandidatesbyCategory(id: string) {
  //   this.candidatesService
  //     .getCandidatesbyJob(id)
  //     .subscribe((candidatesbycatid) => {
  //       this.candidates = candidatesbycatid;
  //       console.log('respectiveCandidates', this.candidates);
  //     });
  // }
  getCandidatesbyJobCount(id: string) {
    let sub2$ = this.candidatesService
      .getCandidatesbyJobCount(id)
      .subscribe((count) => {
        console.log(count);
        this.candidateCount = count;
      });
    this.subscriptions.push(sub2$);
  }
  scheduleInterview(candidate) {
    // console.log(candidate);
    const link = prompt(
      'Please Enter a Valid Google Meet link to schedule an interview and send an email'
    );
    if (link == null || link == '') {
      alert('Invlid Link');
    } else {
      const interviewLink = link;
      const userDetails = { candidate: candidate };
      let sub3$ = this.emailservice
        .scheduleInterview(userDetails, interviewLink)
        .subscribe((data) => {
          console.log(data);
        });
      this.subscriptions.push(sub3$);
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      console.log('unsubscribed');
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }
}

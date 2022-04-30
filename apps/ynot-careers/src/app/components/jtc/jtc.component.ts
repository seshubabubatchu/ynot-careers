import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatesService } from '@ynot-careers/candidates';
import { EmailService } from '@ynot-careers/email';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ynot-careers-jtc',
  templateUrl: './jtc.component.html',
  styleUrls: ['./jtc.component.css'],
})
export class JtcComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private candidateService: CandidatesService,
    private messageservice: MessageService,
    private routing: Router,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.initializeApplyForm();
  }
  //declarations
  applyForm: FormGroup;
  subscriptions: Subscription[] = [];
  jobId = '';
  //methods
  initializeApplyForm() {
    // this.applyForm = new FormGroup({
    //   firstName: new FormControl('', [
    //     Validators.required,
    //     Validators.minLength(3),
    //   ]),
    //   lastName: new FormControl('', [Validators.required]),
    //   email: new FormControl('', [Validators.required]),
    //   gender: new FormControl('', [Validators.required]),
    //   payRate: new FormControl('', [Validators.required]),
    //   address: new FormGroup({
    //     city: new FormControl('', [Validators.required]),
    //     state: new FormControl('', [Validators.required]),
    //     country: new FormControl('', [Validators.required]),
    //   }),
    // });
    this.applyForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });
  }

  onapplySubmit() {
    console.log(this.applyForm.value);
    let sub1$ = this.emailService.sendJtcEmail(this.applyForm.value).subscribe(
      (data) => {
        this.messageservice.add({
          severity: 'success',
          summary: 'Subscribed To JTC',
        });
      },
      (error) => {
        console.log(error);
        this.messageservice.add({
          severity: 'success',
          summary: 'Subscribed To JTC',
        });
      }
    );
    this.subscriptions.push(sub1$);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
    this.subscriptions = [];
  }
}

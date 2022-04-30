import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@ynot-careers/categories';
import { JobsService } from '@ynot-careers/jobs';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ynot-careers-jobs-form',
  templateUrl: './jobs-form.component.html',
  styleUrls: ['./jobs-form.component.css'],
})
export class JobsFormComponent implements OnInit, OnDestroy {
  constructor(
    private categoryService: CategoriesService,
    private jobService: JobsService,
    private messageService: MessageService,
    private location: Location,
    private router: ActivatedRoute
  ) {}
  @ViewChild('jobForm') jobFormData: NgForm;
  ngOnInit(): void {
    this.checkEditMode();
    this.getAllCategories();
  }
  //declarations
  categories: Category[] = [];
  currentJobId;
  defaultType = 'Full Time';
  jobTypes = [
    {
      type: 'Full Time',
      key: 'ft',
    },
    {
      type: 'Part Time',
      key: 'pt',
    },
  ];
  editMode = false;
  defaultDisplay = false;
  subscriptions: Subscription[] = [];
  //methids
  checkEditMode() {
    this.router.params.subscribe((params) => {
      console.log(params);
      if (params.id) {
        this.editMode = true;
        this.getJob(params.id);
        this.currentJobId = params.id;
      }
    });
  }
  onJobSubmit() {
    console.log(this.jobFormData.value);
    if (this.editMode) {
      this.updateJob(this.currentJobId);
    } else {
      this.postJob();
    }
  }
  updateJob(id: string) {
    let sub1$ = this.jobService.updateJob(id, this.jobFormData.value).subscribe(
      (job) => {
        console.log(job);
        this.messageService.add({
          severity: 'success',
          summary: 'Job Updated',
        });
        this.jobService.getAllJobs().subscribe();
        setTimeout(() => {
          this.location.back();
        }, 2000);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'error  Updating Job',
        });
        setTimeout(() => {
          this.location.back();
        }, 2000);
      }
    );
    this.subscriptions.push(sub1$);
  }
  getAllCategories() {
    let sub2$ = this.categoryService
      .getAllCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
    this.subscriptions.push(sub2$);
  }
  getJob(id) {
    let sub3$ = this.jobService.getJob(id).subscribe((job) => {
      console.log(job);
      this.jobFormData.controls['title'].setValue(job.title);
      this.jobFormData.controls['descriptionTeaser'].setValue(
        job.descriptionTeaser
      );
      this.jobFormData.controls['description'].setValue(job.description);
      this.jobFormData.controls['category'].setValue(job.category.id);
      this.jobFormData.controls['hiringType'].setValue(job.hiringType);
      this.jobFormData.controls['location'].setValue(job.location);
      this.jobFormData.controls['display'].setValue(job.display);
    });
    this.subscriptions.push(sub3$);
  }
  postJob() {
    console.log('called post job');
    let sub4$ = this.jobService.postJob(this.jobFormData.value).subscribe(
      (job) => {
        console.log(job);
        this.messageService.add({ severity: 'success', summary: 'Job Added' });
        setTimeout(() => {
          this.location.back();
        }, 2000);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error adding job',
        });
        setTimeout(() => {
          this.location.back();
        }, 2000);
      }
    );
    this.subscriptions.push(sub4$);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      console.log('nsubd');
      sub.unsubscribe();
    });
    this.subscriptions = [];
  }
}

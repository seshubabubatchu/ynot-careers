import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidatesService } from '@ynot-careers/candidates';
import { CategoriesService, Category } from '@ynot-careers/categories';
import { JobsService } from '@ynot-careers/jobs';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CandidatebycatComponent } from '../candidatebycat/candidatebycat.component';

@Component({
  selector: 'ynot-careers-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css'],
})
export class CandidatesComponent implements OnInit, OnDestroy {
  constructor(
    private categoryService: CategoriesService,
    private candidatesService: CandidatesService,
    private router: Router,
    private dialogeService: DialogService
  ) {}

  ngOnInit(): void {
    // this.getAllCategories();
    this.getAllCandidates();
  }
  //declarations
  // categories: Category[];
  allCandidates: any[];
  jobCount: any;
  subscriptions: Subscription[] = [];
  // candidatesbyCategory: any[];
  //methods
  // getAllCategories() {
  //   this.categoryService.getAllCategories().subscribe((categories) => {
  //     this.categories = categories;
  //     console.log(this.categories);
  //   });
  // }
  getAllCandidates() {
    let sub1$ = this.candidatesService
      .getAllCandidates()
      .subscribe((allCandidates) => {
        this.allCandidates = allCandidates;
        console.log(allCandidates);
      });
    this.subscriptions.push(sub1$);
  }

  openCandidatePopup(id: string) {
    const ref = this.dialogeService.open(CandidatebycatComponent, {
      header: 'Candidate Details',
      data: {
        candidateId: id,
      },
      width: '50%',
    });
  }
  navigatetoCatJobs(id: string) {
    console.log(id);
    this.router.navigateByUrl(`/candidates/${id}`);
  }
  // getJobCount(id: string) {
  //   this.candidatesService.getCandidatesbyJobCount(id).subscribe((count) => {
  //     this.jobCount = count;
  //     console.log(this.jobCount);
  //   });
  //   console.log(this.jobCount.count);
  //   return this.jobCount.count;
  // }
  getAllJobs() {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      console.log('unsubscribed');
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@ynot-careers/categories';
import { JobsService } from '@ynot-careers/jobs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ynot-careers-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css'],
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  constructor(
    private categoryService: CategoriesService,
    private jobsService: JobsService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }
  //declarations
  categories: Category[] = [];
  assocaiedJobCount;
  subscriptions: Subscription[] = [];
  //methods

  getAllCategories() {
    let sub1$ = this.categoryService
      .getAllCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
    this.subscriptions.push(sub1$);
  }
  editCategory(id: string) {
    this.router.navigateByUrl(`/categories/${id}`);
    console.log(id);
  }
  getAssociatedJobCount(id: string) {
    let sub2$ = this.jobsService
      .getAssociatedCategoryJobs(id)
      .subscribe((count) => {
        console.log(count.count);
        this.assocaiedJobCount = count.count;
      });
    this.subscriptions.push(sub2$);
  }
  deleteCategory(id: string) {
    this.getAssociatedJobCount(id);
    setTimeout(() => {
      this.confirmationService.confirm({
        message: `Total Associated Jobs ${this.assocaiedJobCount}`,
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (this.assocaiedJobCount > 0) {
            alert(
              `You cannot delete a category that is associated with ${this.assocaiedJobCount} jobs delete all the jobs associated with this category and try deleteing the category`
            );
          } else {
            let sub3$ = this.categoryService
              .deleteCategory(id)
              .subscribe((data) => {
                console.log(data);
                this.categoryService
                  .getAllCategories()
                  .subscribe((categories: Category[]) => {
                    this.categories = categories;
                  });
                this.messageService.add({
                  severity: 'success',
                  summary: 'Category Deleted',
                });
              });
            this.subscriptions.push(sub3$);
          }
        },
        reject: (type) => {},
      });
    }, 2000);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      console.log('unsunscribed');
      sub.unsubscribe();
    });
    this.subscriptions = [];
  }
}

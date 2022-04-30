import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@ynot-careers/categories';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ynot-careers-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css'],
})
export class CategoriesFormComponent implements OnInit, OnDestroy {
  constructor(
    private categoriesService: CategoriesService,
    private router: ActivatedRoute,
    private categoryService: CategoriesService,
    private messageService: MessageService,
    private location: Location
  ) {}
  @ViewChild('categoryForm') categoryForm: NgForm;
  ngOnInit(): void {
    this.checkEditMode();
  }
  //declarations
  editMode = false;
  currentCategory: Category = {};
  subscription: Subscription[] = [];
  //methods
  checkEditMode() {
    this.router.params.subscribe((params) => {
      console.log(params);
      if (params.id) {
        this.editMode = true;
        this.getCategory(params.id);
      }
    });
  }
  onCategoryFormSubmit() {
    console.log(this.editMode);
    if (this.editMode) {
      this.updateCategory();
    } else {
      this.addCategory();
    }
  }
  addCategory() {
    console.log('add called');
    const category = {
      name: this.categoryForm.value.name,
    };
    let sub1$ = this.categoriesService.postCategory(category).subscribe(
      (data) => {
        console.log(data);
        this.messageService.add({
          severity: 'success',
          summary: 'Category Added',
        });
        setTimeout(() => {
          this.location.back();
        }, 2000);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error Adding Category',
        });
        setTimeout(() => {
          this.location.back();
        }, 2000);
      }
    );
    this.subscription.push(sub1$);
  }
  updateCategory() {
    console.log('update called');
    const category = {
      name: this.categoryForm.value.name,
    };
    let sub2$ = this.categoriesService
      .updateCategory(this.currentCategory.id, category)
      .subscribe((data) => {
        console.log(data);
        this.messageService.add({
          severity: 'success',
          summary: 'Category Updated',
        });
        setTimeout(() => {
          this.location.back();
        }, 2000);
      });
    this.subscription.push(sub2$);
  }
  getCategory(id: string) {
    let sub3$ = this.categoriesService
      .getCategory(id)
      .subscribe((category: Category) => {
        this.currentCategory = category;
        this.categoryForm.controls['name'].setValue(this.currentCategory.name);
      });
    this.subscription.push(sub3$);
  }
  ngOnDestroy(): void {
    this.subscription.forEach((subs) => {
      console.log('unsund');
      subs.unsubscribe();
    });
    this.subscription = [];
  }
}

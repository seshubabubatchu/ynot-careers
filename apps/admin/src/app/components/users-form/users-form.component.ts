import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UserService } from '@ynot-careers/users';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ynot-careers-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css'],
})
export class UsersFormComponent implements OnInit, OnDestroy {
  constructor(
    private router: ActivatedRoute,
    private userservice: UserService,
    private location: Location,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.checkEditMode();
    this.fetchUser();
  }
  @ViewChild('userForm') userForm: NgForm;
  userId: string;
  user: User;
  editMode = false;
  jwttoken: string;
  subscriptions: Subscription[] = [];
  checkEditMode() {
    this.router.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;
        this.userId = params.id;
        this.userservice.getUser(params.id).subscribe((user) => {
          this.user = user;
        });
      } else {
        this.editMode = false;
      }
    });
  }
  fetchUser() {
    this.jwttoken = localStorage.getItem('jwtToken');
    if (this.editMode) {
      setTimeout(() => {
        this.userForm.setValue({
          name: this.user.name,
          email: this.user.email,
          isAdmin: this.user.isAdmin,
        });
      }, 1000);
    }
  }
  addUser() {
    console.log('edit mode is', this.editMode);
    console.log('add User called');
    let sub1$ = this.userservice.postUser(this.userForm.value).subscribe(
      (data) => {
        // console.log(data);
        this.messageService.add({
          severity: 'success',
          summary: 'Created',
        });
        setTimeout(() => {
          this.location.back();
        }, 1000);
      },
      (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error Updating',
        });
        setTimeout(() => {
          this.location.back();
        }, 1000);
      }
    );
    this.subscriptions.push(sub1$);
  }
  updateUser(id: string) {
    let sub2$ = this.userservice
      .updateUserAsAdmin(id, this.userForm.value, this.jwttoken)
      .subscribe(
        (user) => {
          // console.log(user);
          this.messageService.add({
            severity: 'success',
            summary: 'Updated',
          });
          setTimeout(() => {
            this.location.back();
          }, 1000);
        },
        (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error Updating',
          });
          setTimeout(() => {
            this.location.back();
          }, 1000);
        }
      );
    this.subscriptions.push(sub2$);
  }
  onUserFormSubmit() {
    console.log('edit mode is', this.editMode);
    // console.log(this.userForm.value);
    if (this.editMode) {
      this.updateUser(this.userId);
    } else {
      this.addUser();
    }

    // this.location.back();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      console.log('unseb');
      sub.unsubscribe();
    });
    this.subscriptions = [];
  }
}

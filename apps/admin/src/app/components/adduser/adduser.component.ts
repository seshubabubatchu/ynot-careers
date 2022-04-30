import { Component, OnDestroy, OnInit } from '@angular/core';
import { User, UserService } from '@ynot-careers/users';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'ynot-careers-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css'],
})
export class AdduserComponent implements OnInit, OnDestroy {
  constructor(
    private userService: UserService,
    private messageSerice: MessageService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }
  users: User[];
  subscriptions: Subscription[] = [];
  getAllUsers() {
    let sub1$: Subscription = this.userService
      .getAllUsers()
      .subscribe((users) => {
        this.users = users;
      });
    this.subscriptions.push(sub1$);
  }
  editUser(id: string) {
    this.router.navigateByUrl(`users/add/${id}`);
  }
  deleteUser(id: string) {
    let sub2$: Subscription = this.userService
      .deleteUser(id)
      .subscribe((data) => {
        this.messageSerice.add({
          severity: 'success',
          summary: 'User Deleted',
        });
      });
    this.getAllUsers();
    this.subscriptions.push(sub2$);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      console.log('unsubscribe');
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }
}

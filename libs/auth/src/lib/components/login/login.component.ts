import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@ynot-careers/users';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ynot-careers-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  //declarations
  loginForm: FormGroup;
  isSubmited = false;
  subscriptions: Subscription[] = [];
  payload: any;
  errormsg: any;
  initForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  loginformSubmit() {
    this.isSubmited = true;
    console.log(this.loginForm.value);
    let sub1$ = this.userService.login(this.loginForm.value).subscribe(
      (data) => {
        // console.log(data);
        this.payload = data;
        localStorage.setItem('jwtToken', data.token);
        this.router.navigateByUrl('');
      },
      (error) => {
        console.log(error);
        this.errormsg = error;
      }
    );
    this.subscriptions.push(sub1$);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscriptions = [];
  }
}

import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CategoriesListComponent } from './components/categories/categories-list/categories-list.component';
import { CategoriesFormComponent } from './components/categories/categories-form/categories-form.component';
import { JobsFormComponent } from './components/jobs/jobs-form/jobs-form.component';
import { JobsListComponent } from './components/jobs/jobs-list/jobs-list.component';
import { CandidatesComponent } from './components/candidates/candidates.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    canActivate: [AuthService],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'categories',
        component: CategoriesListComponent,
      },
      {
        path: 'categories/add',

        component: CategoriesFormComponent,
      },
      {
        path: 'categories/:id',

        component: CategoriesFormComponent,
      },
      {
        path: 'jobs',

        component: JobsListComponent,
      },
      {
        path: 'jobs/add',

        component: JobsFormComponent,
      },
      {
        path: 'jobs/:id',

        component: JobsFormComponent,
      },
      {
        path: 'users',
        component: AdduserComponent,
      },
      // {
      //   path: 'users/add',
      //   component: UsersFormComponent,
      // },

      {
        path: 'users/add/:id',
        component: UsersFormComponent,
      },
      {
        path: 'candidates',
        component: CandidatesComponent,
      },
      {
        path: 'candidates/:id',
        component: CandidatebycatComponent,
      },
    ],
  },
  {
    path: '404',
    component: ErrorComponent,
  },
  // {
  //   path: '**',
  //   redirectTo: '404',
  // },
];

//prime ng modules
import { InputSwitchModule } from 'primeng/inputswitch';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { CandidatebycatComponent } from './components/candidatebycat/candidatebycat.component';

import { AuthModule, AuthService, HttpInterceptor } from 'libs/auth/src';
import { HeaderComponent } from './components/header/header.component';
import { ContainerComponent } from './components/container/container.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdduserComponent } from './components/adduser/adduser.component';
import { UsersFormComponent } from './components/users-form/users-form.component';
const primeNg = [
  InputSwitchModule,
  DynamicDialogModule,
  InputTextModule,
  ConfirmDialogModule,
  ToastModule,
  ButtonModule,
  RadioButtonModule,
  DropdownModule,
  EditorModule,
  TabViewModule,
  CardModule,
  TableModule,
];
@NgModule({
  declarations: [
    AppComponent,

    CategoriesListComponent,
    CategoriesFormComponent,
    JobsFormComponent,
    JobsListComponent,
    CandidatesComponent,
    ErrorComponent,
    CandidatebycatComponent,

    HeaderComponent,
    ContainerComponent,
    DashboardComponent,
    AdduserComponent,
    UsersFormComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ...primeNg,
    RouterModule.forRoot(routes),
    AuthModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    DialogService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CareersFooterComponent } from './components/careers-footer/careers-footer.component';
import { HomeComponent } from './components/home/home.component';
import { JtcComponent } from './components/jtc/jtc.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ApplyComponent } from './components/apply/apply.component';
import { ApplyThankyouComponent } from './components/apply-thankyou/apply-thankyou.component';
import { JobComponent } from './components/job/job.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'search-results',
    component: SearchResultsComponent,
  },
  {
    path: 'join-our-community',
    component: JtcComponent,
  },
  {
    path: 'job/:id',
    component: JobComponent,
  },
  {
    path: 'job/:id/apply',
    component: ApplyComponent,
  },
  {
    path: 'job/:id/applyThankyou',
    component: ApplyThankyouComponent,
  },
];
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataViewModule } from 'primeng/dataview';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
const primeNg = [
  ToastModule,
  DropdownModule,
  CardModule,
  DataViewModule,
  InputTextModule,
];
@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    NavbarComponent,
    CareersFooterComponent,
    HomeComponent,
    JtcComponent,
    SearchResultsComponent,
    ApplyComponent,
    ApplyThankyouComponent,
    JobComponent,
  ],
  imports: [
    ...primeNg,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}

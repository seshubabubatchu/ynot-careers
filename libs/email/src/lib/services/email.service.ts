import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http: HttpClient) {}
  emailurl = `https://ynot-careers-backend.herokuapp.com/api/v1/email`;
  sendemail(userDetails: Object): Observable<any> {
    return this.http.post(`${this.emailurl}/email`, userDetails);
  }
  sendTestemail(userDetails: Object, emailBody: any): Observable<any> {
    const body = {
      userDetails: userDetails,
      emailbody: emailBody,
    };
    return this.http.post(`${this.emailurl}/testing`, body);
  }
  scheduleInterview(
    userDetails: Object,
    interviewLink: string
  ): Observable<any> {
    const body = {
      userDetails: userDetails,
      interviewLink: interviewLink,
    };
    return this.http.post(`${this.emailurl}/scheduleInterview`, body);
  }
  sendJtcEmail(userDetails: Object): Observable<any> {
    const body = {
      userDetails: userDetails,
    };
    return this.http.post(`${this.emailurl}/jtc`, body);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usersUrl = `https://ynot-careers-backend.herokuapp.com/api/v1/users`;
  constructor(private http: HttpClient) {}
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }
  postUser(userData: User): Observable<User> {
    return this.http.post<User>(`${this.usersUrl}/admin/register`, userData);
  }
  updateUser(id: string, userData: User): Observable<User> {
    return this.http.put<User>(`${this.usersUrl}/${id}`, userData);
  }
  updateUserAsAdmin(
    id: string,
    userData: User,
    jwtToken: string
  ): Observable<User> {
    // console.log(id, userData, jwtToken);
    return this.http.put<User>(
      `${this.usersUrl}/admin/update/${id}`,
      userData,
      {
        headers: new HttpHeaders({
          authorization: jwtToken,
        }),
      }
    );
  }
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.usersUrl}/${id}`);
  }
  postAdmin(adminData: User): Observable<User> {
    return this.http.post<User>(`${this.usersUrl}/admin/register`, adminData);
  }
  updateAdmin(id: string, adminData: User): Observable<User> {
    return this.http.put<User>(
      `${this.usersUrl}/admin/update/${id}`,
      adminData
    );
  }
  register() {}

  login(data: any): Observable<any> {
    return this.http.post(`${this.usersUrl}/login`, data);
  }
  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${id}`);
  }
}

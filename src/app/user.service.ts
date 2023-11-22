import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { environment } from './environment';

const apiUrl = environment.apiUrl;
const loginUrl = environment.loginUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(apiUrl);
  }

  getUserById(id: string): Observable<User> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<User>(url);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(apiUrl, user);
  }

  updateUser(user: User): Observable<User> {
    const url = `${apiUrl}/${user._id}`;
    return this.http.put<User>(url, user);
  }

  deleteUser(id: string): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url);
  }

  login(username: string, password: string): Observable<any> {
    const credentials = { username: username, password: password };
    return this.http.post(`${loginUrl}`, credentials);
  }
}

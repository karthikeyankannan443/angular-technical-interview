import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private userService: UserService) {}

  isLoggedIn(): boolean {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  }

  login(username: string, password: string): void {
    const isValid = !!username && !!password;
    if (isValid) {
      this.userService.login(username, password).subscribe((res: any) =>{
        this.loggedIn.next(true);
        sessionStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/users']);
      });
    } else {
      this.loggedIn.next(false);
      sessionStorage.setItem('isLoggedIn', 'false');
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.loggedIn.next(false);
  }
}

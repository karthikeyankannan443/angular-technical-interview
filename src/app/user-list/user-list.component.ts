import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  isLoggedIn: boolean = false;
  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe(() => {
      alert("Unicorn deleted Sucessfully");
      this.loadUsers();
    });
  }

  navigateToAddPage(): void {
    this.router.navigate(['/users/add']);
  }

  navigateToEditPage(id: string): void {
    const userId = id;
    this.router.navigate(['/users/edit/', userId]);
  }

  logOut(): void {
    if(this.isLoggedIn){
      sessionStorage.clear();
      this.router.navigate(['/login']);
    }
  }
}

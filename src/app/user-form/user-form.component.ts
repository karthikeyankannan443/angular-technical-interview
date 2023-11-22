import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {
  user: User = { name: '', age: 0, colour: '' };
  isEdit = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.isEdit = true;
      this.userService.getUserById(userId).subscribe((user) => {
        this.user = user;
      });
    }
  }

  saveUser(): void {
    if (this.isEdit) {
      this.userService.updateUser(this.user).subscribe(() => {
        alert("Unicorn updated Sucessfully");
        this.router.navigate(['/users']);
      });
    } else {
      this.userService.addUser(this.user).subscribe(() => {
        alert("Unicorn added Sucessfully");
        this.router.navigate(['/users']);
      });
    }
  }
}

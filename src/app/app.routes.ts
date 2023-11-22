import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { canActivateChild } from './auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UserListComponent,  canActivate: [canActivateChild], },
    { path: 'users/add', component: UserFormComponent },
    { path: 'users/edit/:id', component: UserFormComponent },
];

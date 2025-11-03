import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface User {
  id?: number;
  name: string;
  email: string;
}

@Component({
  standalone: true,
  selector: 'app-user-list',
  imports: [CommonModule, HttpClientModule, FormsModule],
  template: `
    <section>
      <h2>Users</h2>
      <form (ngSubmit)="saveUser()" class="user-form">
        <input [(ngModel)]="currentUser.name" name="name" placeholder="Name" required />
        <input [(ngModel)]="currentUser.email" name="email" placeholder="Email" required />
        <button type="submit">{{currentUser.id ? 'Update' : 'Create'}}</button>
        <button type="button" (click)="reset()">Reset</button>
      </form>

      <ul>
        <li *ngFor="let user of users">
          <strong>{{ user.name }}</strong> — {{ user.email }}
          <button (click)="edit(user)">Edit</button>
          <button (click)="delete(user)">Delete</button>
        </li>
      </ul>
    </section>
  `,
  styles: [`
    .user-form { display: flex; gap: .5rem; margin-bottom: 1rem; }
    input { padding: .4rem; }
    button { padding: .4rem .7rem; }
    ul { list-style: none; padding: 0; }
    li { margin-bottom: .5rem; }
  `]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  currentUser: User = { name: '', email: '' };
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<User[]>(this.apiUrl).subscribe(data => this.users = data);
  }

  saveUser() {
    if (this.currentUser.id) {
      this.http.put<User>(`${this.apiUrl}/${this.currentUser.id}`, this.currentUser).subscribe(() => {
        this.loadUsers();
        this.reset();
      });
    } else {
      this.http.post<User>(this.apiUrl, this.currentUser).subscribe(() => {
        this.loadUsers();
        this.reset();
      });
    }
  }

  edit(user: User) {
    this.currentUser = { ...user };
  }

  delete(user: User) {
    if (!user.id) return;
    this.http.delete(`${this.apiUrl}/${user.id}`).subscribe(() => this.loadUsers());
  }

  reset() {
    this.currentUser = { name: '', email: '' };
  }
}

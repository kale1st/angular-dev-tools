import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
  selected: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', active: true, selected: false },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', active: true, selected: false },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator', active: false, selected: false },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', active: true, selected: false }
  ];

  private usersSubject = new BehaviorSubject<User[]>(this.users);
  users$: Observable<User[]> = this.usersSubject.asObservable();

  getUsers(): User[] {
    return [...this.users];
  }

  toggleUserSelection(userId: number): void {
    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex > -1) {
      this.users[userIndex].selected = !this.users[userIndex].selected;
      this.usersSubject.next([...this.users]);
    }
  }

  updateUserRole(userId: number, newRole: string): void {
    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex > -1) {
      this.users[userIndex].role = newRole;
      this.usersSubject.next([...this.users]);
    }
  }

  addUser(name: string, email: string): void {
    const newUser: User = {
      id: this.users.length + 1,
      name,
      email,
      role: 'User',
      active: true,
      selected: false
    };
    this.users.push(newUser);
    this.usersSubject.next([...this.users]);
  }
}
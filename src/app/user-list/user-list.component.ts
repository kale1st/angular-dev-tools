import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, User } from '../user.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
standalone: true,
  imports: [CommonModule, UserCardComponent]
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  showDebug = false;
  selectedCount = 0;
  activeCount = 0;
  private subscription!: Subscription;
  
  constructor(private userService: UserService) {}
  
  ngOnInit(): void {
    this.subscription = this.userService.users$.subscribe(users => {
      this.users = users;
      this.updateCounts();
    });

 const component = this as any;
     console.log('Component state:', {
    ngContext: component.__ngContext__,
    properties: Object.keys(component)
  });
  }
  
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  
  onUserSelected(userId: number): void {
    this.userService.toggleUserSelection(userId);
  }
  
  onRoleChange(event: {id: number, role: string}): void {
    this.userService.updateUserRole(event.id, event.role);
  }
  
  toggleDebug(): void {
    this.showDebug = !this.showDebug;
  }
  
  addRandomUser(): void {
    const names = ['Charlie Wilson', 'Diana Prince', 'Ethan Hunt', 'Fiona Gallagher'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const email = randomName.toLowerCase().replace(' ', '.') + '@example.com';
    this.userService.addUser(randomName, email);
  }
  
  private updateCounts(): void {
    this.selectedCount = this.users.filter(u => u.selected).length;
    this.activeCount = this.users.filter(u => u.active).length;
  }
  
  get debugInfo() {
    return {
      component: 'UserListComponent',
      usersCount: this.users.length,
      selectedCount: this.selectedCount,
      activeCount: this.activeCount,
      timestamp: new Date().toISOString()
    };
  }
}
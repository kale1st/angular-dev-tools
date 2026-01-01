import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule]
})
export class UserCardComponent {
  @Input() user!: User;
  @Input() showDebug = false;
  @Output() selected = new EventEmitter<number>();
  @Output() roleChange = new EventEmitter<{id: number, role: string}>();

 ngOnInit(): void {
  this.debugComponentState();
 }
 
  toggleSelection(): void {
    this.selected.emit(this.user.id);
  }

  changeRole(): void {
    const newRole = prompt('Enter new role:', this.user.role);
    if (newRole && newRole !== this.user.role) {
      this.roleChange.emit({ id: this.user.id, role: newRole });
    }
  }
 
  debugComponentState(): void {
  const component = this as any;
  console.log('Component state:', {
    ngContext: component.__ngContext__,
    properties: Object.keys(component)
  });
}
}
// task-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './task-card.component.html',
})
export class TaskCardComponent {
  @Input() task!: any; // مدل تسک خود را جایگزین any کنید
}
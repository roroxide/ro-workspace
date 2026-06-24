import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  // دریافت وضعیت باز بودن سایدبار در موبایل از کامپوننت والد
  @Input() isOpen = false;

  // ارسال رویدادها به کامپوننت والد
  @Output() closeSidebar = new EventEmitter<void>();
  @Output() newTaskClicked = new EventEmitter<void>();
  @Output() categoriesClicked = new EventEmitter<void>();

  onClose() {
    this.closeSidebar.emit();
  }

  onNewTask() {
    this.newTaskClicked.emit();
  }
}
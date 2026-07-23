import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task, Category } from '../../services/task.service'; // مسیر مدل‌های خود را تنظیم کنید

@Component({
  selector: 'app-task-edit-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-edit-modal.component.html'
})
export class TaskEditModalComponent implements OnInit {
  @Input() task!: Task;
  @Input() categories: Category[] = [];
  
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Task>();

  // یک کپی از تسک می‌سازیم تا تغییرات قبل از تایید روی بورد اصلی اعمال نشود
  editedTask!: Task;

  ngOnInit() {
    this.editedTask = {
      ...this.task,
      // اگر دسته‌بندی یک آبجکت است، از آن هم کپی می‌گیریم
      category: { ...this.task.category }
    };
  }

  onCategoryChange(catId: string) {
    const selectedCat = this.categories.find(c => c.id === catId);
    if (selectedCat) {
      this.editedTask.category = { ...selectedCat };
    }
  }

  onSave() {
    if (!this.editedTask.title.trim()) return;
    this.save.emit(this.editedTask);
  }

  onClose() {
    this.close.emit();
  }
}
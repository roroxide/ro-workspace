import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Category } from '../../services/task.service';

@Component({
  selector: 'app-new-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-task-modal.component.html',
  styleUrl: './new-task-modal.component.scss'
})
export class NewTaskModalComponent implements OnInit {
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();

  // فیلدهای فرم
  taskTitle = '';
  taskDesc = '';
  isUrgent = false;
  isImportant = false;

  isCategoryDropdownOpen = false;
  isStatusDropdownOpen = false;

  selectedCategory: Category = { 
    id: 'none', 
    name: 'بدون دسته‌بندی', 
    color: 'text-gray-600', 
    bg: 'bg-gray-50', 
    rawColor: 'bg-gray-400' 
  };
  selectedStatus = { id: 'todo', name: 'آماده (Todo)' };

  categories: Category[] = [];

  statuses = [
    { id: 'todo', name: 'آماده (Todo)' },
    { id: 'doing', name: 'در حال انجام (Doing)' },
    { id: 'done', name: 'انجام شده (Done)' }
  ];

  // ۴. تزریق سرویس در کانستراکتور
  constructor(private taskService: TaskService) {}

  ngOnInit() {
  // خواندن دسته‌بندی‌های زنده از سرویس
    this.taskService.categories$.subscribe(cats => {
      this.categories = cats;
      if (cats.length > 0 && !this.selectedCategory.id) {
        this.selectedCategory = cats[0]; // قرار دادن سطر اول به عنوان پیش‌فرض
      }
    });
  }

  onClose() {
    this.resetForm();
    this.closeModal.emit();
  }

  selectCategory(cat: any) {
    this.selectedCategory = cat;
    this.isCategoryDropdownOpen = false;
  }

  selectStatus(status: any) {
    this.selectedStatus = status;
    this.isStatusDropdownOpen = false;
  }

  onSubmit() {
    if (!this.taskTitle.trim()) {
      alert('لطفاً عنوان کار را وارد کنید.');
      return;
    }

    // فرستادن مستقیم مقادیر boolean به سرویس
    this.taskService.addTask({
      title: this.taskTitle,
      desc: this.taskDesc,
      isUrgent: this.isUrgent,
      isImportant: this.isImportant
    }, this.selectedCategory, this.selectedStatus.id);

    this.onClose();
  }

  private resetForm() {
    this.taskTitle = '';
    this.taskDesc = '';
    this.isUrgent = false;
    this.isImportant = false;
    this.isCategoryDropdownOpen = false;
    this.isStatusDropdownOpen = false;
    
    // بازنشانی به دسته‌بندی پیش‌فرض (عنصر اول لیست که از سرویس گرفتیم)
    if (this.categories.length > 0) {
      this.selectedCategory = this.categories[0];
    }
    this.selectedStatus = this.statuses[0];
  }
}